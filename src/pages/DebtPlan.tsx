import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DebtPlan = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [numDebts, setNumDebts] = useState<number>(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("rr_num_lenders");
      if (stored) {
        if (stored === "4+") {
          setNumDebts(4);
        } else {
          const parsed = parseInt(stored, 10);
          if (!Number.isNaN(parsed)) {
            setNumDebts(parsed);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    const once = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            if (once) observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full min-h-screen">
      {/* Background image */}
      <div
        className="absolute top-0 w-full -z-10 h-screen bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1920&q=80')",
        }}
      />

      {/* Stacked blur gradient */}
      <div className="gradient-blur pointer-events-none fixed inset-x-0 bottom-0 top-auto h-[65%] z-10">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Page wrapper */}
      <div className="relative z-20">
        {/* Header */}
        <header className="relative z-20 [animation:fadeSlideIn_0.5s_ease-in-out_0.1s_both]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between border-b border-white/10 pt-6 pb-6">
              <div className="text-white font-semibold text-lg tracking-tight">RupeeRebel</div>
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition rounded-full border border-white/10 px-3.5 py-2 backdrop-blur border-gradient before:rounded-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="relative z-10">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 mt-16 mb-24">
            <div className="text-center [animation:fadeSlideIn_0.5s_ease-in-out_0.2s_both]">
              <h1 className="font-semibold tracking-tighter text-white drop-shadow-xl leading-[1.05] text-3xl sm:text-4xl md:text-5xl">
                Build your{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-white">
                  debt freedom plan
                </span>
              </h1>
              {email && (
                <p className="mt-4 text-sm text-white/60">
                  Creating plan for <span className="text-white/80">{email}</span>
                </p>
              )}
            </div>

            {/* Plan builder form */}
            <div className="mt-12 rounded-[28px] bg-neutral-900/50 backdrop-blur-xl shadow-[0_20px_120px_-20px_rgba(0,0,0,0.7)] border border-white/5 border-gradient before:rounded-[28px] p-6 sm:p-8 [animation:fadeSlideIn_0.5s_ease-in-out_0.3s_both]">
              <h2 className="text-xl font-semibold text-white mb-6">Tell us about your debts</h2>

              <form className="space-y-6">
                {/* Dynamic debt cards */}
                {Array.from({ length: numDebts }, (_, i) => i + 1).map((idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-white/5 backdrop-blur-sm p-5 border border-white/10"
                  >
                    <h3 className="text-sm font-medium text-white mb-4">Debt #{idx}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-white/60 mb-2">Lender name</label>
                        <input
                          type="text"
                          placeholder="e.g., HDFC Credit Card"
                          className="w-full rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-orange-300/60"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/60 mb-2">Outstanding amount (₹)</label>
                        <input
                          type="number"
                          placeholder="e.g., 50000"
                          className="w-full rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-orange-300/60"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/60 mb-2">Interest rate (%)</label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="e.g., 18.5"
                          className="w-full rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-orange-300/60"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/60 mb-2">Minimum payment (₹)</label>
                        <input
                          type="number"
                          placeholder="e.g., 2500"
                          className="w-full rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-orange-300/60"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Monthly budget */}
                <div className="rounded-xl bg-white/5 backdrop-blur-sm p-5 border border-white/10">
                  <h3 className="text-sm font-medium text-white mb-4">Your budget</h3>
                  <div>
                    <label className="block text-xs text-white/60 mb-2">
                      How much can you pay toward debts each month? (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 15000"
                      className="w-full rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-orange-300/60"
                    />
                    <p className="mt-2 text-xs text-white/50">
                      This should cover all minimum payments plus extra.
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <button className="cta-button w-full sm:w-auto" type="submit">
                  <span>Generate my plan</span>
                </button>
              </form>
            </div>

            {/* Info section */}
            <div className="mt-8 text-center text-xs text-white/60 [animation:fadeSlideIn_0.5s_ease-in-out_0.4s_both]">
              <p>Your information is private and secure. We never share your data.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 border-t border-white/10 pt-10 pb-10">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/50 md:flex-row">
              <p>© {new Date().getFullYear()} RupeeRebel. All rights reserved.</p>
              <div className="flex items-center gap-6 text-white/60">
                <a href="#" className="hover:text-white transition">
                  Privacy
                </a>
                <a href="#" className="hover:text-white transition">
                  Terms
                </a>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DebtPlan;
