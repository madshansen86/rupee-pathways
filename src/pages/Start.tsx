import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Start = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    totalDebt: "",
    numLenders: "",
    monthlyIncome: "",
    stressLevel: "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  // Prefill email from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEmail = window.localStorage.getItem("rr_email");
      if (savedEmail) {
        setFormData((prev) => ({
          ...prev,
          email: savedEmail,
        }));
      }
    }
  }, []);

  // Handle submission to Supabase
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("intake_submissions").insert([
      {
        email: formData.email,
        total_debt: formData.totalDebt,
        num_lenders: formData.numLenders,
        monthly_income: formData.monthlyIncome,
        stress_level: formData.stressLevel,
      },
    ]);

    if (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong — please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    } else {
      navigate("/debt-plan");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col">
      {/* background layer could mirror hero page background if you have one */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img
            src="/logo-rr.svg"
            alt="RupeeRebel"
            className="h-8 w-auto"
          />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Title / intro */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <h1 className="text-white text-3xl md:text-4xl font-semibold tracking-tight">
            Let's build your plan
          </h1>
          <p className="text-white/70 text-base mt-3">
            Answer a few quick questions. This doesn't affect your credit
            score.
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6"
        >
          {/* Total Debt */}
          <div className="flex flex-col gap-2 text-left text-white">
            <label
              htmlFor="totalDebt"
              className="text-sm font-medium text-white"
            >
              What do you currently owe in total?
            </label>
            <div className="flex items-center w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 focus-within:ring-2 focus-within:ring-orange-300/60">
              <span className="text-white/60 text-sm mr-2">₹</span>
              <input
                id="totalDebt"
                type="number"
                min="0"
                required
                className="bg-transparent flex-1 outline-none text-white text-sm placeholder:text-white/40"
                placeholder="Total debt amount"
                value={formData.totalDebt}
                onChange={(e) =>
                  setFormData({ ...formData, totalDebt: e.target.value })
                }
              />
            </div>
          </div>

          {/* Number of Lenders */}
          <div className="flex flex-col gap-2 text-left text-white">
            <label
              htmlFor="numLenders"
              className="text-sm font-medium text-white"
            >
              How many lenders are you paying each month?
            </label>
            <select
              id="numLenders"
              required
              className="w-full rounded-lg bg-white/5 border border-white/20 text-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300/60"
              value={formData.numLenders}
              onChange={(e) =>
                setFormData({ ...formData, numLenders: e.target.value })
              }
            >
              <option value="" disabled>
                Select…
              </option>
              <option value="1">1</option>
              <option value="2-3">2–3</option>
              <option value="4+">4+</option>
            </select>
          </div>

          {/* Monthly Income */}
          <div className="flex flex-col gap-2 text-left text-white">
            <label
              htmlFor="monthlyIncome"
              className="text-sm font-medium text-white"
            >
              What's your combined monthly take-home income?
            </label>
            <div className="flex items-center w-full rounded-lg bg-white/5 border border-white/20 px-3 py-2 focus-within:ring-2 focus-within:ring-orange-300/60">
              <span className="text-white/60 text-sm mr-2">₹</span>
              <input
                id="monthlyIncome"
                type="number"
                min="0"
                required
                className="bg-transparent flex-1 outline-none text-white text-sm placeholder:text-white/40"
                placeholder="Monthly income"
                value={formData.monthlyIncome}
                onChange={(e) =>
                  setFormData({ ...formData, monthlyIncome: e.target.value })
                }
              />
            </div>
          </div>

          {/* Stress Level */}
          <div className="flex flex-col gap-2 text-left text-white">
            <span className="text-sm font-medium text-white">
              How are you feeling about your debt right now?
            </span>

            <div className="flex flex-col gap-3">
              {/* Option 1 */}
              <label className="flex items-start gap-2 bg-white/5 rounded-lg border border-white/20 px-3 py-2 cursor-pointer">
                <input
                  type="radio"
                  name="stressLevel"
                  value="managing"
                  className="accent-orange-400 cursor-pointer mt-1"
                  checked={formData.stressLevel === "managing"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stressLevel: e.target.value,
                    })
                  }
                  required
                />
                <span className="text-sm text-white">I'm managing it</span>
              </label>

              {/* Option 2 */}
              <label className="flex items-start gap-2 bg-white/5 rounded-lg border border-white/20 px-3 py-2 cursor-pointer">
                <input
                  type="radio"
                  name="stressLevel"
                  value="stressed"
                  className="accent-orange-400 cursor-pointer mt-1"
                  checked={formData.stressLevel === "stressed"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stressLevel: e.target.value,
                    })
                  }
                />
                <span className="text-sm text-white">I'm stressed about it</span>
              </label>

              {/* Option 3 */}
              <label className="flex items-start gap-2 bg-white/5 rounded-lg border border-white/20 px-3 py-2 cursor-pointer">
                <input
                  type="radio"
                  name="stressLevel"
                  value="urgent"
                  className="accent-orange-400 cursor-pointer mt-1"
                  checked={formData.stressLevel === "urgent"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stressLevel: e.target.value,
                    })
                  }
                />
                <span className="text-sm text-white">It's urgent</span>
              </label>
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2 text-left text-white">
            <label htmlFor="email" className="text-sm font-medium text-white">
              Your email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-lg bg-white/5 border border-white/20 text-white text-sm px-3 py-2 placeholder:text-white/40 outline-none focus:ring-2 focus:ring-orange-300/60"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <span className="text-xs text-white/60">
              We'll send your personalised plan to this email.
            </span>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col">
            <button
              type="submit"
              disabled={isSubmitting}
              className="button shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] w-full justify-center text-center"
            >
              <span className="inner font-geist">
                {isSubmitting ? "Saving..." : "Show my plan →"}
              </span>
            </button>
            <p className="text-center text-xs text-white/60 mt-2">
              Private. No spam.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Start;