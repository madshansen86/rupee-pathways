import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

interface Debt {
  lender_name: string;
  balance: number;
  interest_rate: number;
  min_payment: number;
}

const YourPlan = () => {
  const navigate = useNavigate();
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);
  const [strategy, setStrategy] = useState<"snowball" | "avalanche">("snowball");
  const [quickWins, setQuickWins] = useState({
    freezeSpend: false,
    autoAdd: false,
    callLender: false,
  });

  useEffect(() => {
    const fetchDebts = async () => {
      const email = window.localStorage.getItem("rr_email");
      if (!email) {
        navigate("/start");
        return;
      }

      const { data, error } = await supabase
        .from("debts")
        .select("lender_name, balance, interest_rate, min_payment")
        .eq("user_email", email)
        .order("debt_index", { ascending: true });

      if (error) {
        console.error("Error fetching debts:", error);
        toast({
          title: "Error loading debts",
          description: "Please try again later.",
          variant: "destructive",
        });
      } else {
        setDebts(data || []);
      }
      setLoading(false);
    };

    fetchDebts();

    // Load quick wins from localStorage
    const stored = window.localStorage.getItem("rr_quick_wins");
    if (stored) {
      try {
        setQuickWins(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing quick wins:", e);
      }
    }

    // Confetti animation
    const duration = 2000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, [navigate]);

  // Sanitize helper
  const toNum = (v: any) => {
    if (v == null) return 0;
    if (typeof v === "string") return Number(v.replace(/[₹,\s]/g, "")) || 0;
    return Number(v) || 0;
  };

  // Normalize every render
  const normalizedDebts = (Array.isArray(debts) ? debts : []).map((d: any, i: number) => {
    const name = d.lender_name ?? d.lenderName ?? `Lender ${i + 1}`;
    return {
      key: d.id ?? `${name}-${i}`,
      lender_name: name,
      balance: toNum(d.balance ?? d.total),
      interest_rate: toNum(d.interest_rate ?? d.interestRate ?? d.rate),
      min_payment: toNum(d.min_payment ?? d.minPayment ?? d.minimum),
    };
  });

  const totalDebt = normalizedDebts.reduce((sum, d) => sum + d.balance, 0);
  const totalMonthly = normalizedDebts.reduce((sum, d) => sum + d.min_payment, 0);
  const months = Math.ceil(totalDebt / Math.max(totalMonthly, 1));

  // Deterministic comparators (with tie-breakers)
  const cmpSnowball = (a: any, b: any) =>
    (a.balance - b.balance) ||
    (b.interest_rate - a.interest_rate) ||
    a.lender_name.localeCompare(b.lender_name);

  const cmpAvalanche = (a: any, b: any) =>
    (b.interest_rate - a.interest_rate) ||
    (a.balance - b.balance) ||
    a.lender_name.localeCompare(b.lender_name);

  // Build the sorted list fresh (no memo)
  const sortedDebts = [...normalizedDebts].sort(strategy === "snowball" ? cmpSnowball : cmpAvalanche);

  const handleConsolidationClick = async () => {
    const email = window.localStorage.getItem("rr_email");
    if (!email) return;

    const { error } = await supabase
      .from("followups")
      .insert([{ user_email: email, wants_consolidation: true }]);

    if (error) {
      console.error("Error inserting followup:", error);
      toast({
        title: "Error",
        description: "Could not save your request. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Request saved",
        description: "We'll email you next steps.",
      });
    }
  };

  const toggleQuickWin = (key: keyof typeof quickWins) => {
    const updated = { ...quickWins, [key]: !quickWins[key] };
    setQuickWins(updated);
    window.localStorage.setItem("rr_quick_wins", JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white font-geist">Loading your plan...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/[0.06]">
        <Link to="/" className="flex items-center">
          <img
            src="/logo-rr.svg"
            alt="RupeeRebel"
            className="h-12 w-auto md:h-14 transition-transform duration-200 hover:scale-105"
          />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/debt-plan"
            className="text-white/70 hover:text-white text-sm font-geist transition-colors"
          >
            Edit answers
          </Link>
          <Link
            to="/"
            className="text-white/70 hover:text-white text-sm font-geist transition-colors"
          >
            Start over
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-sm">
          <h1 className="text-5xl md:text-6xl font-geist tracking-tighter font-semibold text-white max-w-3xl">
            Congratulations — you've taken action!
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-xl">
            You are already doing so much better than your peers by taking steps to control your debts. Please review your plan below.
          </p>
        </section>

        {/* Snapshot cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="border-gradient before:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <p className="text-white/60 font-geist text-sm mb-2">
              Total unsecured debt
            </p>
            <p className="text-white font-geist font-bold text-3xl">
              ₹{totalDebt.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="border-gradient before:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <p className="text-white/60 font-geist text-sm mb-2">
              Going out each month
            </p>
            <p className="text-white font-geist font-bold text-3xl">
              ₹{totalMonthly.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="border-gradient before:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <p className="text-white/60 font-geist text-sm mb-2">
              Estimated months to debt-free
            </p>
            <p className="text-white font-geist font-bold text-3xl">{months}</p>
            <p className="text-white/50 font-geist text-xs mt-2">
              Add ₹2,000/mo saves ~{Math.ceil(totalDebt / Math.max(totalMonthly + 2000, 1)) < months ? months - Math.ceil(totalDebt / Math.max(totalMonthly + 2000, 1)) : 0} months
            </p>
          </div>
        </div>

        {/* Strategy tabs */}
        <div className="border-gradient before:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStrategy("snowball")}
              className={`px-3 py-2 rounded-lg font-geist text-sm transition ${
                strategy === "snowball"
                  ? "bg-white/10 text-white"
                  : "bg-transparent border border-white/10 text-white/70"
              }`}
            >
              Snowball
            </button>
            <button
              type="button"
              onClick={() => setStrategy("avalanche")}
              className={`px-3 py-2 rounded-lg font-geist text-sm transition ${
                strategy === "avalanche"
                  ? "bg-white/10 text-white"
                  : "bg-transparent border border-white/10 text-white/70"
              }`}
            >
              Avalanche
            </button>
            <span className="ml-3 text-xs text-white/60 font-geist">
              Mode: <span className="text-white">{strategy}</span>
            </span>
          </div>

          {/* Render strictly as a vertical list, and HARD-remount when strategy changes */}
          <ol key={strategy} className="space-y-4">
            {sortedDebts.map((d, i) => (
              <li
                key={d.key}
                className="border-gradient before:rounded-xl bg-white/5 rounded-xl p-4 backdrop-blur"
              >
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold font-geist">
                    Step {i + 1}: Focus {d.lender_name}
                  </p>
                  <span className="text-xs text-white/60 font-geist">
                    {strategy === "snowball" ? "Smallest balance first" : "Highest APR first"}
                  </span>
                </div>

                {/* On-screen debug badges so you SEE the sort keys */}
                <div className="mt-2 flex gap-2 text-[11px] text-white/70 font-geist">
                  <span className="inline-block bg-white/10 rounded px-2 py-0.5">Balance: ₹{d.balance.toLocaleString()}</span>
                  <span className="inline-block bg-white/10 rounded px-2 py-0.5">APR: {d.interest_rate}%</span>
                  <span className="inline-block bg-white/10 rounded px-2 py-0.5">Min: ₹{d.min_payment.toLocaleString()}</span>
                </div>

                <p className="mt-1 text-xs text-white/60 font-geist">
                  Then roll ₹{d.min_payment.toLocaleString()} into the next step.
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Consolidation preview */}
        <div className="border-gradient before:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-geist font-semibold text-xl tracking-tighter">
            Consolidation preview
          </h2>
          <p className="text-white/60 font-geist text-sm">
            You're paying ₹{totalMonthly.toLocaleString("en-IN")}/mo across {debts.length} lenders. We may be able to consolidate into one payment.
          </p>
          <div className="relative inline-block">
            <button
              onClick={handleConsolidationClick}
              className="relative bg-orange-400 hover:bg-orange-500 text-black font-semibold px-6 py-3 rounded-xl shadow-md transition-all"
            >
              Check my eligibility
            </button>
            <span className="absolute -top-2 -right-2 bg-white/20 text-white text-[10px] uppercase tracking-widest px-2 py-[2px] rounded-md">
              Coming soon
            </span>
          </div>
        </div>

        {/* Quick wins */}
        <div className="border-gradient before:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-geist font-semibold text-xl tracking-tighter">
            Quick wins
          </h2>
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={quickWins.freezeSpend}
                onChange={() => toggleQuickWin("freezeSpend")}
                className="mt-1 accent-orange-500"
              />
              <span className="text-white/80 group-hover:text-white font-geist text-sm transition-colors">
                Freeze new spend on the highest-APR card
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={quickWins.autoAdd}
                onChange={() => toggleQuickWin("autoAdd")}
                className="mt-1 accent-orange-500"
              />
              <span className="text-white/80 group-hover:text-white font-geist text-sm transition-colors">
                Auto-add ₹1,000 to Step 1 each month
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={quickWins.callLender}
                onChange={() => toggleQuickWin("callLender")}
                className="mt-1 accent-orange-500"
              />
              <span className="text-white/80 group-hover:text-white font-geist text-sm transition-colors">
                Call your highest-APR lender and request a hardship rate review
              </span>
            </label>
          </div>
        </div>
      </main>
    </div>
  );
};

export default YourPlan;
