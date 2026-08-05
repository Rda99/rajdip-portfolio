import { Briefcase, CheckCircle2, Globe2, Sparkles } from "lucide-react";

const hsbcHighlights = [
  "Architected and delivered an enterprise-scale AI-powered Address Standardization Platform combining machine learning, rule-based intelligence, and a proprietary knowledge base.",
  "Standardized 5M+ records across 55+ countries with 95–98% accuracy, supporting HSBC’s global data transformation programme.",
  "Increased throughput from ~3,000 manually standardized records/day to millions of records/day, reducing manual effort equivalent to 4–5 FTEs.",
  "Built a reusable metadata-driven framework to onboard new countries and business rules faster while reducing dependence on commercial address standardization solutions.",
  "Adopted by multiple global teams and 10–15+ analysts as the preferred enterprise solution for address standardization.",
];

const otherExperience = [
  {
    company: "Grant Thornton Bharat LLP",
    role: "Consultant",
    period: "Jun 2025 – Aug 2025",
    summary:
      "Delivered enterprise-scale data analytics for government welfare and digital governance, including scalable pipelines for household identity resolution and LLM-powered citizen services.",
  },
  {
    company: "Innovaccer Analytics Pvt Ltd.",
    role: "Data Analyst/Engineer - Tech Transformation",
    period: "Oct 2024 – May 2025",
    summary:
      "Built end-to-end data engineering pipelines with Snowflake, Alteryx, and Databricks for predictive analytics in US healthcare.",
  },
  {
    company: "PricewaterhouseCoopers (PwC) Pvt Ltd.",
    role: "Data Engineer - Associate 2",
    period: "Sept 2021 – Oct 2024",
    summary:
      "Worked on customer segmentation, LTV analysis, forecasting, and governance pipelines, improving personalization and reducing manual effort.",
  },
];

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-center gap-3 text-cyan-300">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-medium uppercase tracking-[0.22em]">Portfolio</span>
        </div>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Rajdip Dutta
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Senior Data & AI Engineer specializing in enterprise AI, data engineering,
              and intelligent automation across financial services, healthcare, government,
              and e-commerce.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Current focus</p>
            <p className="mt-2 text-base leading-7 text-slate-200">
              Building scalable, cloud-ready systems, AI-enabled workflows, and production-grade data products.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-6 flex items-center gap-3">
          <Briefcase className="h-5 w-5 text-cyan-300" />
          <h2 className="text-2xl font-semibold">Experience</h2>
        </div>

        <div className="grid gap-6">
          <article className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6 shadow-lg shadow-cyan-950/20">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">Featured</p>
                <h3 className="mt-2 text-2xl font-semibold">HSBC · Senior Data Analyst</h3>
                <p className="mt-1 text-sm text-slate-300">Kolkata, India · Aug 2025 – Present</p>
              </div>
              <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
                Enterprise AI Transformation
              </div>
            </div>

            <p className="mt-5 max-w-4xl text-slate-200">
              Architected and delivered an enterprise-scale AI-powered Address Standardization Platform,
              combining machine learning, rule-based intelligence, and a proprietary knowledge base to automate
              global address validation and standardization.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {hsbcHighlights.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-slate-950/50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                  <p className="text-sm leading-6 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </article>

          {otherExperience.map((job) => (
            <article key={job.company} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold">{job.company}</h3>
                  <p className="mt-1 text-sm text-slate-300">{job.role}</p>
                </div>
                <p className="text-sm text-slate-400">{job.period}</p>
              </div>
              <p className="mt-4 text-slate-300">{job.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3">
            <Globe2 className="h-5 w-5 text-cyan-300" />
            <h2 className="text-2xl font-semibold">About this portfolio</h2>
          </div>
          <p className="mt-4 max-w-3xl text-slate-300">
            This section is optimized to showcase enterprise impact first, with HSBC positioned as the flagship
            experience. It is ready to be committed to GitHub so Render can redeploy automatically.
          </p>
        </div>
      </section>
    </main>
  );
}
