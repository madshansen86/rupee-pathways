import { useState } from "react";
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
                <div className="flex flex-col gap-2 text-left text-white">
                  <label htmlFor="numLenders" className="text-sm font-medium text-white">
                    How many lenders are you paying each month?
                  </label>
                  <select
                    id="numLenders"
                    className="w-full rounded-lg bg-white/5 border border-white/20 text-white text-sm px-3 py-2 placeholder:text-white/40 outline-none focus:ring-2 focus:ring-orange-300/60"
                    value={formData.numLenders}
                    onChange={(e) => setFormData({ ...formData, numLenders: e.target.value })}
                    required
                  >
                    <option value="" disabled className="bg-gray-900">Select...</option>
                    <option value="1" className="bg-gray-900">1</option>
                    <option value="2-3" className="bg-gray-900">2–3</option>
                    <option value="4+" className="bg-gray-900">4+</option>
                  </select>
                </div>

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
                <div className="flex flex-col gap-2 text-left text-white">
                  <label className="text-sm font-medium text-white">
                    How are you feeling about your debt right now?
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 rounded-lg bg-white/5 border border-white/20 px-3 py-2">
                      <input
                        type="radio"
                        id="managing"
                        name="stressLevel"
                        value="managing"
                        className="mt-1 accent-orange-400"
                        checked={formData.stressLevel === "managing"}
                        onChange={(e) => setFormData({ ...formData, stressLevel: e.target.value })}
                        required
                      />
                      <label htmlFor="managing" className="text-sm text-white cursor-pointer flex-1">
                        I'm managing it
                      </label>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg bg-white/5 border border-white/20 px-3 py-2">
                      <input
                        type="radio"
                        id="stressed"
                        name="stressLevel"
                        value="stressed"
                        className="mt-1 accent-orange-400"
                        checked={formData.stressLevel === "stressed"}
                        onChange={(e) => setFormData({ ...formData, stressLevel: e.target.value })}
                        required
                      />
                      <label htmlFor="stressed" className="text-sm text-white cursor-pointer flex-1">
                        I'm stressed about it
                      </label>
                    </div>
                    <div className="flex items-start gap-2 rounded-lg bg-white/5 border border-white/20 px-3 py-2">
                      <input
                        type="radio"
                        id="urgent"
                        name="stressLevel"
                        value="urgent"
                        className="mt-1 accent-orange-400"
                        checked={formData.stressLevel === "urgent"}
                        onChange={(e) => setFormData({ ...formData, stressLevel: e.target.value })}
                        required
                      />
                      <label htmlFor="urgent" className="text-sm text-white cursor-pointer flex-1">
                        It's urgent
                      </label>
                    </div>
                  </div>
                </div>

                {/* Question 5: Email */}
                <div className="flex flex-col gap-2 text-left text-white">
                  <label htmlFor="email" className="text-sm font-medium text-white">
                    Your email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-lg bg-white/5 border border-white/20 text-white text-sm px-3 py-2 placeholder:text-white/40 outline-none focus:ring-2 focus:ring-orange-300/60"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <p className="text-xs text-white/60">
                    We'll send your personalised plan to this email.
                  </p>
                </div>

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
