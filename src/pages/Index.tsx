import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    navigate(`/debt-plan?email=${encodeURIComponent(email as string)}`);
  };

  return (
    <div className="h-full">
      {/* Full-page blurred background */}
      <div className="absolute inset-0 -z-10 h-screen w-full">
        <img
          src="/background.jpg"
          alt="RupeeRebel background"
          className="w-full h-full object-cover blur-sm scale-105 opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/20 via-orange-600/10 to-black/60 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

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
              <div className="flex items-center">
                <img
                  src="/logo.png"
                  alt="RupeeRebel logo"
                  className="h-12 w-auto"
                />
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="#"
                  className="hidden sm:inline-flex text-sm font-medium text-white/70 hover:text-white transition rounded-full border border-white/10 px-3.5 py-2 backdrop-blur border-gradient before:rounded-full"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-semibold tracking-tighter text-white drop-shadow-xl leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl [animation:fadeSlideIn_0.5s_ease-in-out_0.2s_both]">
                Take your life back
                <br className="hidden sm:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-white">
                  from debt.
                </span>
              </h1>

              <p className="max-w-2xl mx-auto text-base md:text-lg text-white/70 mt-6 [animation:fadeSlideIn_0.5s_ease-in-out_0.3s_both]">
                Build your personalised debt freedom plan. One monthly path. Less stress. More control.
              </p>

              <form
                className="w-full max-w-xl mx-auto flex flex-col sm:flex-row gap-3 mt-8 [animation:fadeSlideIn_0.5s_ease-in-out_0.4s_both]"
                onSubmit={handleSubmit}
              >
                <label className="flex-1 relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-full border border-white/5 bg-white/5 px-4 py-3 pr-12 text-sm text-white placeholder:text-white/40 outline-none ring-0 focus:ring-2 focus:ring-orange-300/60 shadow-[0_2.8px_2.2px_rgba(0,0,0,0.034),_0_6.7px_5.3px_rgba(0,0,0,0.048),_0_12.5px_10px_rgba(0,0,0,0.06),_0_22.3px_17.9px_rgba(0,0,0,0.072),_0_41.8px_33.4px_rgba(0,0,0,0.086),_0_100px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl border-gradient before:rounded-xl"
                  />
                </label>

                <button className="cta-button" type="submit">
                  <span>Let's get started →</span>
                </button>
              </form>

              <div className="text-xs text-white/60 mt-4 [animation:fadeSlideIn_0.5s_ease-in-out_0.5s_both]">
                Private. No spam. You're in control.
              </div>
            </div>

          </div>
        </section>

        {/* How we help you become debt free */}
        <section className="relative z-10 mt-32 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border-gradient before:rounded-full bg-white/5 px-3 py-1.5 backdrop-blur">
              <span className="text-xs text-white/70">How we help you become debt free</span>
            </div>

            <h2 className="mt-8 text-white text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter drop-shadow-xl">
              Take a quick test and get a free actionable plan to become debt free
            </h2>

            <p className="mt-4 text-white/70 text-base md:text-lg max-w-xl mx-auto">
              By following three simple steps we can help you become debt free and secure you a smaller monthly repayment.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3 text-left">
              {/* Card 1 */}
              <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 border-gradient before:rounded-xl p-4">
                <p className="text-xs text-white/60 uppercase tracking-wider">1. Who are you?</p>
                <p className="text-white text-sm font-semibold tracking-tight mt-2">
                  Answer a few questions about your situation and let's compare you to the situation of others.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 border-gradient before:rounded-xl p-4">
                <p className="text-xs text-white/60 uppercase tracking-wider">2. Your free debt dashboard and repayment action plan</p>
                <p className="text-white text-sm font-semibold tracking-tight mt-2">
                  We will provide you with a smart and manageable repayment action plan.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 border-gradient before:rounded-xl p-4">
                <p className="text-xs text-white/60 uppercase tracking-wider">3. All debt into one repayment</p>
                <p className="text-white text-sm font-semibold tracking-tight mt-2">
                  Let us check if you are eligible for a cheaper consolidation loan altogether.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard preview card */}
        <section className="relative z-10 mt-24 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto [animation:fadeSlideIn_0.5s_ease-in-out_0.6s_both]">
            <div className="mx-auto rounded-[28px] bg-neutral-900/50 backdrop-blur-xl shadow-[0_20px_120px_-20px_rgba(0,0,0,0.7)] border border-white/5 border-gradient before:rounded-[28px]">
              <div className="flex items-start justify-between border-b border-white/5 px-4 py-3 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <span className="h-3.5 w-3.5 rounded-full bg-red-500/90"></span>
                    <span className="h-3.5 w-3.5 rounded-full bg-amber-400/90"></span>
                    <span className="h-3.5 w-3.5 rounded-full bg-emerald-500/90"></span>
                  </div>
                  <div className="inline-flex items-baseline gap-2">
                    <span className="text-xl font-semibold tracking-tight text-white">RupeeRebel</span>
                    <span className="text-xs text-white/40">Plan Preview</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
                <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4 border border-white/10 border-gradient before:rounded-xl">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Total debt</p>
                  <p className="mt-2 text-2xl font-semibold text-white tracking-tighter">₹3,20,000</p>
                  <p className="mt-1 text-xs text-slate-500">across 5 accounts</p>
                </div>

                <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4 border border-white/10 border-gradient before:rounded-xl">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Monthly plan</p>
                  <p className="mt-2 text-2xl font-semibold text-white tracking-tighter">₹14,500</p>
                  <p className="mt-1 text-xs text-slate-500">what you'll pay total per month</p>
                </div>

                <div className="rounded-xl bg-white/5 backdrop-blur-sm p-4 border border-white/10 border-gradient before:rounded-xl">
                  <p className="text-xs uppercase tracking-wider text-slate-400">Debt-free target</p>
                  <p className="mt-2 text-2xl font-semibold text-white tracking-tighter">Mar 2029</p>
                  <div className="mt-3">
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-orange-300 to-white h-1.5 rounded-full"
                        style={{ width: "62%" }}
                      ></div>
                    </div>
                    <p className="mt-1 text-xs text-white/70">62% to freedom</p>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 text-xs text-slate-400">
                "We'll show you which debt to attack first, and exactly when you could be free."
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="relative z-10 mt-24 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border-gradient before:rounded-full bg-white/5 px-3 py-1.5 backdrop-blur">
              <span className="text-xs text-white/70">Resources</span>
            </div>

            <h2 className="mt-6 text-white text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tighter drop-shadow-xl">
              Learn how to break free from debt
            </h2>

            <p className="mt-4 text-white/70 text-base md:text-lg max-w-xl mx-auto">
              No jargon. Just clear answers to the stuff nobody teaches you.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3 text-left">
              {/* Blog 1 */}
              <article className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 border-gradient before:rounded-xl p-4 flex flex-col">
                <p className="text-xs text-white/60 uppercase tracking-wider">Guide</p>
                <h3 className="text-white text-sm font-semibold tracking-tight mt-2">
                  The truth about minimum payments
                </h3>
                <p className="text-white/60 text-xs mt-2">
                  Why paying "just the minimum" keeps you in debt longer than you think — and how to flip it.
                </p>
                <a href="#" className="mt-4 text-[11px] text-white/70 hover:text-white underline underline-offset-2 decoration-white/30">
                  Read more →
                </a>
              </article>

              {/* Blog 2 */}
              <article className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 border-gradient before:rounded-xl p-4 flex flex-col">
                <p className="text-xs text-white/60 uppercase tracking-wider">Playbook</p>
                <h3 className="text-white text-sm font-semibold tracking-tight mt-2">
                  Avalanche vs Snowball: which is right for you?
                </h3>
                <p className="text-white/60 text-xs mt-2">
                  Two payoff strategies. One saves you more money. One keeps you more motivated. Here's how to choose.
                </p>
                <a href="#" className="mt-4 text-[11px] text-white/70 hover:text-white underline underline-offset-2 decoration-white/30">
                  Read more →
                </a>
              </article>

              {/* Blog 3 */}
              <article className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 border-gradient before:rounded-xl p-4 flex flex-col">
                <p className="text-xs text-white/60 uppercase tracking-wider">Option</p>
                <h3 className="text-white text-sm font-semibold tracking-tight mt-2">
                  What is a consolidation loan?
                </h3>
                <p className="text-white/60 text-xs mt-2">
                  How rolling multiple debts into one payment can lower stress — and when it's actually a bad idea.
                </p>
                <a href="#" className="mt-4 text-[11px] text-white/70 hover:text-white underline underline-offset-2 decoration-white/30">
                  Read more →
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 mt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 border-t border-white/10 pt-10 pb-10">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/50 md:flex-row">
              <p>
                © {new Date().getFullYear()} RupeeRebel. All rights reserved.
              </p>
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

export default Index;
