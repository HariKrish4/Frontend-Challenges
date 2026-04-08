export default function Home() {
  const capabilities = [
    "React architecture for complex product surfaces",
    "React Native and Expo delivery for cross-platform teams",
    "Express.js APIs with pragmatic service boundaries",
    "Supabase-backed products with auth, storage, and realtime",
    "AI agent workflows for faster prototyping, testing, and refactors",
  ];

  const highlights = [
    {
      value: "13+",
      label: "Years shipping web and mobile products",
    },
    {
      value: "40",
      label: "Engineers mentored across product squads",
    },
    {
      value: "7",
      label: "Startups and scale-ups delivered end to end",
    },
  ];

  const projects = [
    {
      title: "FieldOps Pulse",
      summary:
        "Built a React Native and Expo platform for distributed service teams with offline-first task flows, push dispatching, and live job tracking.",
      impact: "Cut task completion delays by 31% across regional crews.",
      stack: "React Native, Expo, Supabase, Edge Functions",
    },
    {
      title: "Signal Commerce OS",
      summary:
        "Designed a modular React dashboard and Express.js backend for merchandising, promotions, and reporting across multi-brand storefronts.",
      impact: "Reduced release lead time from weekly batches to daily deploys.",
      stack: "React, Express.js, PostgreSQL, event-driven jobs",
    },
    {
      title: "Agent Studio",
      summary:
        "Introduced AI agent-assisted scaffolding, test generation, and code review loops to accelerate internal product development without sacrificing rigor.",
      impact:
        "Saved roughly 18 engineering hours per sprint on repetitive delivery work.",
      stack: "LLM agents, TypeScript, CI automation, evaluation prompts",
    },
  ];

  const principles = [
    "Prefer systems that are easy to change over systems that only look sophisticated.",
    "Treat mobile, backend, and frontend as one product surface, not separate silos.",
    "Use AI agents to remove toil, but keep architecture and quality decisions human-owned.",
  ];

  const leadershipAreas = [
    {
      title: "Engineering Leadership",
      summary:
        "Led cross-functional squads of frontend, mobile, backend, QA, and design contributors with clear technical direction, delivery accountability, and pragmatic mentoring.",
    },
    {
      title: "Project Management",
      summary:
        "Translated product goals into scoped roadmaps, sprint plans, risk registers, and stakeholder updates so delivery stayed predictable without slowing execution.",
    },
    {
      title: "Team Operations",
      summary:
        "Set up planning rituals, architecture reviews, release checklists, and incident retrospectives that improved visibility and reduced avoidable churn.",
    },
  ];

  return (
    <main className="relative overflow-hidden bg-[var(--color-sand)] text-[var(--color-ink)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top_left,_rgba(242,112,52,0.22),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(10,86,78,0.18),_transparent_28%),linear-gradient(180deg,_rgba(255,248,238,0.95),_rgba(247,240,228,0.72))]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
        <header className="flex flex-col gap-5 border-b border-[color:rgba(24,35,32,0.12)] pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
              Dummy Portfolio / Senior Full Stack Developer
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Kiran Solanki
            </h1>
          </div>
          <nav className="flex flex-wrap gap-3 text-sm text-[var(--color-muted)]">
            <a className="chip" href="#work">
              Work
            </a>
            <a className="chip" href="#stack">
              Stack
            </a>
            <a className="chip" href="#leadership">
              Leadership
            </a>
            <a className="chip" href="#process">
              Process
            </a>
            <a className="chip" href="#contact">
              Contact
            </a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.3fr_0.7fr] lg:py-24">
          <div className="space-y-10">
            <div className="space-y-6">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-accent)]">
                React / React Native / Express.js / Supabase / Expo / AI Agents
              </p>
              <h2 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Building dependable product systems with web, mobile, backend,
                and agentic workflows aligned.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
                I am a full stack developer with 13 years of experience shaping
                product architecture, leading delivery teams, and shipping
                thoughtful software across browsers, mobile devices, and service
                layers. My recent focus is combining solid engineering with AI
                agents that speed up execution without lowering standards.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a className="cta-primary" href="#contact">
                Book a product build sprint
              </a>
              <a className="cta-secondary" href="#work">
                Explore selected work
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <article key={item.label} className="metric-card">
                  <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                    {item.label}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="relative isolate overflow-hidden rounded-[2rem] border border-[color:rgba(24,35,32,0.12)] bg-[rgba(17,38,35,0.96)] p-7 text-[var(--color-cream)] shadow-[0_30px_100px_rgba(39,45,32,0.18)] sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,180,91,0.35),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(80,214,190,0.22),_transparent_35%)]" />
            <div className="relative space-y-7">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[rgba(247,240,228,0.68)]">
                  Current Focus
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight">
                  Shipping fast without letting architecture decay.
                </h3>
              </div>

              <div className="space-y-3">
                {capabilities.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-[rgba(247,240,228,0.86)] backdrop-blur-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-[rgba(247,240,228,0.14)] bg-black/20 p-4">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[rgba(247,240,228,0.58)]">
                  Delivery Style
                </p>
                <p className="mt-3 text-sm leading-7 text-[rgba(247,240,228,0.88)]">
                  Senior IC depth, team-level systems thinking, and practical AI
                  automation where it removes repeatable engineering drag.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="work"
        className="relative mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12"
      >
        <div className="mb-12 max-w-2xl">
          <p className="section-label">Selected Work</p>
          <h2 className="section-title">
            Recent product systems and delivery patterns.
          </h2>
          <p className="section-copy">
            The portfolio is intentionally fictional, but the project framing is
            grounded in the kind of outcomes a senior full stack engineer is
            usually hired to own.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.title} className="portfolio-card">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
                {project.stack}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                {project.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">
                {project.summary}
              </p>
              <p className="mt-8 border-t border-[color:rgba(24,35,32,0.1)] pt-5 text-sm font-medium leading-6 text-[var(--color-ink)]">
                {project.impact}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="stack"
        className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-12"
      >
        <div>
          <p className="section-label">Stack Snapshot</p>
          <h2 className="section-title">
            Technology choices tied to product outcomes.
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            [
              "React",
              "Complex admin surfaces, design systems, and performance-sensitive product UIs.",
            ],
            [
              "React Native + Expo",
              "One codebase, careful native capability choices, and faster iteration loops.",
            ],
            [
              "Express.js",
              "Lean APIs, service orchestration, webhooks, and integration-heavy backends.",
            ],
            [
              "Supabase",
              "Auth, Postgres, storage, realtime, and fast product scaffolding with sane defaults.",
            ],
          ].map(([title, description]) => (
            <article
              key={title}
              className="rounded-[1.75rem] border border-[color:rgba(24,35,32,0.1)] bg-white/70 p-6 shadow-[0_18px_60px_rgba(30,40,35,0.08)] backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="leadership"
        className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12"
      >
        <div>
          <p className="section-label">Leadership</p>
          <h2 className="section-title">
            Project leadership that keeps delivery aligned and measurable.
          </h2>
          <p className="section-copy">
            Beyond implementation, this profile also positions Kiran as a senior
            lead who can organize delivery, mentor engineers, and keep product,
            design, and engineering moving in the same direction.
          </p>
        </div>

        <div className="grid gap-4">
          {leadershipAreas.map((area, index) => (
            <article
              key={area.title}
              className="rounded-[1.75rem] border border-[color:rgba(24,35,32,0.1)] bg-white/75 px-6 py-6 shadow-[0_18px_60px_rgba(30,40,35,0.08)] backdrop-blur-sm"
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
                Lead 0{index + 1}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                {area.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">
                {area.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="process"
        className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12"
      >
        <div className="rounded-[2rem] border border-[color:rgba(24,35,32,0.12)] bg-[var(--color-clay)] p-8 text-[var(--color-cream)] shadow-[0_24px_80px_rgba(44,47,38,0.18)] sm:p-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[rgba(247,240,228,0.62)]">
            AI-Augmented Delivery
          </p>
          <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            AI agents are part of the workflow, not a substitute for software
            engineering judgment.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[rgba(247,240,228,0.82)]">
            I use agentic tooling to speed up discovery, scaffolding, repetitive
            refactors, baseline tests, and documentation. The architecture,
            tradeoff calls, and release responsibility still stay explicit and
            reviewable.
          </p>
        </div>

        <div className="space-y-4">
          {principles.map((principle, index) => (
            <article
              key={principle}
              className="rounded-[1.75rem] border border-[color:rgba(24,35,32,0.1)] bg-[rgba(255,255,255,0.7)] px-6 py-6 shadow-[0_12px_44px_rgba(30,40,35,0.06)] backdrop-blur-sm"
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
                0{index + 1}
              </p>
              <p className="mt-3 text-base leading-7 text-[var(--color-ink)]">
                {principle}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto w-full max-w-7xl px-6 pb-20 pt-8 sm:px-8 lg:px-12"
      >
        <div className="rounded-[2.4rem] border border-[color:rgba(24,35,32,0.12)] bg-[linear-gradient(135deg,_rgba(10,86,78,0.95),_rgba(24,35,32,0.96))] px-8 py-10 text-[var(--color-cream)] shadow-[0_28px_90px_rgba(24,35,32,0.24)] sm:px-10 sm:py-12 lg:flex lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[rgba(247,240,228,0.62)]">
              Let’s Build
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Need a senior developer who can move across frontend, mobile,
              backend, and delivery systems?
            </h2>
            <p className="mt-5 text-base leading-8 text-[rgba(247,240,228,0.82)]">
              This dummy portfolio positions Kiran as the kind of engineer you
              bring in when the product needs clearer foundations, faster
              iteration, and less operational drag.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-sm lg:mt-0 lg:items-end">
            <a
              className="cta-primary cta-inverted"
              href="mailto:kiran.solanki@example.com"
            >
              kiran.solanki@example.com
            </a>
            <p className="font-mono uppercase tracking-[0.2em] text-[rgba(247,240,228,0.58)]">
              Based in Bengaluru / Available for remote and hybrid work
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
