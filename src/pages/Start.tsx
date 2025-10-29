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

  useEffect(() => {
    const savedEmail =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('rr_email')
        : null
    if (savedEmail) {
      const emailField = document.getElementById('email') as HTMLInputElement | null
      if (emailField) {
        emailField.value = savedEmail
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Background with gradient and blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.jpg')",
          filter: "blur(8px)",
          transform: "scale(1.1)"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="RupeeRebel" 
              className="h-8 w-auto drop-shadow-lg"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="container mx-auto px-4 py-16">
          {/* Title Section */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <h1 className="text-white text-3xl md:text-4xl font-semibold tracking-tight">
              Let's build your plan
            </h1>
            <p className="text-white/70 text-base mt-3">
              Answer a few quick questions. This doesn't affect your credit score.
            </p>
          </div>

          {/* Survey Form Card */}
          <div className="max-w-xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8 border-gradient before:rounded-2xl">
              <form id="onboarding-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Question 1: Total Debt */}
                <div className="flex flex-col gap-2 text-left text-white">
                  <label htmlFor="totalDebt" className="text-sm font-medium text-white">
                    What do you currently owe in total?
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">₹</span>
                    <input
                      id="totalDebt"
                      type="number"
                      className="w-full rounded-lg bg-white/5 border border-white/20 text-white text-sm px-3 py-2 pl-8 placeholder:text-white/40 outline-none focus:ring-2 focus:ring-orange-300/60"
                      placeholder="0"
                      value={formData.totalDebt}
                      onChange={(e) => setFormData({ ...formData, totalDebt: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Question 2: Number of Lenders */}
                <label className="flex flex-col gap-2 text-left text-white">
                  <span className="text-sm font-medium text-white">
                    How many lenders are you paying each month?
                  </span>
                  <select
                    id="numLenders"
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/20 text-white text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-orange-300/60"
                    defaultValue=""
                  >
                    <option value="" disabled>Select…</option>
                    <option value="1">1</option>
                    <option value="2-3">2–3</option>
                    <option value="4+">4+</option>
                  </select>
                </label>

                {/* Question 3: Monthly Income */}
                <div className="flex flex-col gap-2 text-left text-white">
                  <label htmlFor="monthlyIncome" className="text-sm font-medium text-white">
                    What's your combined monthly take-home income?
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">₹</span>
                    <input
                      id="monthlyIncome"
                      type="number"
                      className="w-full rounded-lg bg-white/5 border border-white/20 text-white text-sm px-3 py-2 pl-8 placeholder:text-white/40 outline-none focus:ring-2 focus:ring-orange-300/60"
                      placeholder="0"
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Question 4: Feeling (Radio Group) */}
                <fieldset className="flex flex-col gap-3 text-left text-white">
                  <legend className="text-sm font-medium text-white mb-1">
                    How are you feeling about your debt right now?
                  </legend>

                  <label className="flex items-start gap-2 bg-white/5 rounded-lg border border-white/20 px-3 py-2 cursor-pointer">
                    <input
                      type="radio"
                      name="stressLevel"
                      value="managing"
                      required
                      className="accent-orange-400 cursor-pointer mt-1"
                    />
                    <span className="text-sm text-white">I'm managing it</span>
                  </label>

                  <label className="flex items-start gap-2 bg-white/5 rounded-lg border border-white/20 px-3 py-2 cursor-pointer">
                    <input
                      type="radio"
                      name="stressLevel"
                      value="stressed"
                      className="accent-orange-400 cursor-pointer mt-1"
                    />
                    <span className="text-sm text-white">I'm stressed about it</span>
                  </label>

                  <label className="flex items-start gap-2 bg-white/5 rounded-lg border border-white/20 px-3 py-2 cursor-pointer">
                    <input
                      type="radio"
                      name="stressLevel"
                      value="urgent"
                      className="accent-orange-400 cursor-pointer mt-1"
                    />
                    <span className="text-sm text-white">It's urgent</span>
                  </label>
                </fieldset>

                {/* Question 5: Email */}
                <label className="flex flex-col gap-2 text-left text-white">
                  <span className="text-sm font-medium text-white">Your email</span>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-lg bg-white/5 border border-white/20 text-white text-sm px-3 py-2 placeholder:text-white/40 outline-none focus:ring-2 focus:ring-orange-300/60"
                  />
                  <span className="text-xs text-white/60">
                    We'll send your personalised plan to this email.
                  </span>
                </label>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Show my plan →"}
                  </button>
                  <p className="text-center text-xs text-white/60 mt-2">
                    Private. No spam.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Start;
