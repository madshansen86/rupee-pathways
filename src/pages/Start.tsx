import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
          {/* Intro Section */}
          <div className="max-w-[480px] mx-auto text-center mb-12">
            <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight drop-shadow-xl mb-4">
              Let's build your plan
            </h1>
            <p className="text-white/70 text-base md:text-lg">
              Answer a few quick questions. This doesn't affect your credit score.
            </p>
          </div>

          {/* Survey Form Card */}
          <div className="max-w-[480px] mx-auto">
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl">
              <form id="onboarding-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Question 1: Total Debt */}
                <div className="space-y-2">
                  <Label htmlFor="totalDebt" className="text-white text-sm font-medium">
                    What do you currently owe in total?
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">₹</span>
                    <Input
                      id="totalDebt"
                      type="number"
                      className="pl-8 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      placeholder="0"
                      value={formData.totalDebt}
                      onChange={(e) => setFormData({ ...formData, totalDebt: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Question 2: Number of Lenders */}
                <div className="space-y-2">
                  <Label htmlFor="lenders" className="text-white text-sm font-medium">
                    How many lenders are you paying each month?
                  </Label>
                  <Select
                    value={formData.numLenders}
                    onValueChange={(value) => setFormData({ ...formData, numLenders: value })}
                    required
                  >
                    <SelectTrigger 
                      id="numLenders"
                      className="bg-white/5 border-white/20 text-white"
                    >
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2-3">2–3</SelectItem>
                      <SelectItem value="4+">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Question 3: Monthly Income */}
                <div className="space-y-2">
                  <Label htmlFor="income" className="text-white text-sm font-medium">
                    What's your combined monthly take-home income?
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">₹</span>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      className="pl-8 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                      placeholder="0"
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Question 4: Feeling */}
                <div className="space-y-3">
                  <Label className="text-white text-sm font-medium">
                    How are you feeling about your debt right now?
                  </Label>
                  <RadioGroup
                    value={formData.stressLevel}
                    onValueChange={(value) => setFormData({ ...formData, stressLevel: value })}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="managing" id="managing" className="border-white/40" />
                      <Label htmlFor="managing" className="text-white text-sm font-normal cursor-pointer">
                        I'm managing it
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="stressed" id="stressed" className="border-white/40" />
                      <Label htmlFor="stressed" className="text-white text-sm font-normal cursor-pointer">
                        I'm stressed about it
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="urgent" id="urgent" className="border-white/40" />
                      <Label htmlFor="urgent" className="text-white text-sm font-normal cursor-pointer">
                        It's urgent
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 5: Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-sm font-medium">
                    Your email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
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
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Show my plan →"}
                  </Button>
                  <p className="text-xs text-white/60 text-center mt-3">
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
