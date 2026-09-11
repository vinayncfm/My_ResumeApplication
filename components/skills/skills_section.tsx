import {
  Brain,
  CheckCircle2,
  Code2,
  Cpu,
  Layers3,
  Server,
  Sparkles,
  Workflow,
} from "lucide-react";

import skillsData from "@/data/skills.json";

const domainIcons = [
  Brain,
  Server,
  Workflow,
  Code2,
  Layers3,
  Cpu,
];

const domainAccentClasses = [
  {
    icon: "bg-blue-50 text-blue-600",
    border: "border-blue-200",
    header: "bg-blue-50/45",
    skill: "border-blue-100 bg-blue-50/30",
    progress: "from-blue-500 to-cyan-500",
  },
  {
    icon: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-200",
    header: "bg-emerald-50/45",
    skill: "border-emerald-100 bg-emerald-50/30",
    progress: "from-emerald-500 to-teal-500",
  },
  {
    icon: "bg-orange-50 text-orange-600",
    border: "border-orange-200",
    header: "bg-orange-50/45",
    skill: "border-orange-100 bg-orange-50/30",
    progress: "from-orange-400 to-amber-500",
  },
  {
    icon: "bg-violet-50 text-violet-600",
    border: "border-violet-200",
    header: "bg-violet-50/45",
    skill: "border-violet-100 bg-violet-50/30",
    progress: "from-violet-500 to-purple-500",
  },
  {
    icon: "bg-pink-50 text-pink-600",
    border: "border-pink-200",
    header: "bg-pink-50/45",
    skill: "border-pink-100 bg-pink-50/30",
    progress: "from-pink-500 to-rose-500",
  },
  {
    icon: "bg-cyan-50 text-cyan-600",
    border: "border-cyan-200",
    header: "bg-cyan-50/45",
    skill: "border-cyan-100 bg-cyan-50/30",
    progress: "from-cyan-500 to-blue-500",
  },
];

function getRatingWidth(rating: number) {
  const safeRating = Math.max(0, Math.min(10, rating));
  return `${safeRating * 10}%`;
}

export default function SkillsSection() {
  const enabledDomains = skillsData.domains.filter(
    (domain) => domain.enabled,
  );

  const totalSkills = enabledDomains.reduce(
    (total, domain) =>
      total + domain.skills.filter((skill) => skill.enabled).length,
    0,
  );

  return (
    <section
      id="skills"
      className="h-[calc(100vh-78px)] overflow-hidden px-4 py-3 sm:px-5 lg:px-6 lg:py-4"
    >
      <div className="mx-auto h-full max-w-[1280px]">
        <section
          className="
            relative h-full overflow-hidden rounded-3xl
            border border-slate-200/80
            bg-gradient-to-br from-slate-50 via-white to-blue-50/70
            shadow-[0_8px_35px_rgba(37,99,235,0.06)]
          "
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100/35 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-emerald-100/30 blur-3xl" />

          <div className="relative z-10 flex h-full min-h-0 flex-col p-4 sm:p-5 lg:p-6">
            {/* HEADER */}
            <div className="flex shrink-0 items-center justify-between gap-4">
              <div className="min-w-0">
                <div
                  className="
                    mb-2 inline-flex items-center gap-2
                    rounded-full border border-slate-200
                    bg-white px-2.5 py-1
                    text-[10px] font-bold uppercase
                    tracking-[0.12em] text-slate-500
                    shadow-sm
                  "
                >
                  <Sparkles size={12} className="text-blue-500" />
                  Skills
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                  Technical Skills
                </h1>

                <p className="mt-1 max-w-3xl text-xs leading-5 text-slate-500 sm:text-[13px]">
                  A practical view of my current technical capabilities,
                  organized by domain and self-assessed on a 1–10 scale.
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <div
                  className="
                    rounded-2xl border border-slate-200
                    bg-white/90 px-4 py-2.5
                    text-center shadow-sm
                  "
                >
                  <p className="text-xl font-bold text-slate-950">
                    {enabledDomains.length}
                  </p>
                  <p className="text-[10px] font-medium text-slate-500">
                    Core Domains
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl border border-slate-200
                    bg-white/90 px-4 py-2.5
                    text-center shadow-sm
                  "
                >
                  <p className="text-xl font-bold text-slate-950">
                    {totalSkills}
                  </p>
                  <p className="text-[10px] font-medium text-slate-500">
                    Skills
                  </p>
                </div>
              </div>
            </div>

            {/* DOMAIN GRID */}
            <div
              className="
                mt-4 grid min-h-0 flex-1
                grid-cols-1 gap-3
                overflow-hidden
                md:grid-cols-2
                xl:grid-cols-6
                xl:grid-rows-2
              "
            >
              {enabledDomains.map((domain, domainIndex) => {
                const Icon =
                  domainIcons[domainIndex % domainIcons.length];

                const accent =
                  domainAccentClasses[
                    domainIndex % domainAccentClasses.length
                  ];

                const enabledSkills = domain.skills.filter(
                  (skill) => skill.enabled,
                );

                

                return (
                  <section
                    key={domain.id}
                    className={`
                      xl:col-span-2
                      flex min-h-0 flex-col overflow-hidden
                      rounded-2xl border
                      ${accent.border}
                      bg-white/80
                      shadow-[0_2px_8px_rgba(15,23,42,0.035)]
                    `}
                  >
                    {/* DOMAIN HEADER */}
                    <div
                      className={`
                        shrink-0 border-b
                        ${accent.border}
                        ${accent.header}
                        px-3 py-2.5
                      `}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-xl
                            ${accent.icon}
                          `}
                        >
                          <Icon size={18} strokeWidth={2} />
                        </div>

                        <div className="min-w-0">
                          <h2 className="text-[18px] font-bold leading-5 text-slate-950">
                            {domain.name}
                          </h2>

                          {domain.description && (
                            <p className="mt-0.5 line-clamp-2 text-[12px] leading-4 text-slate-500">
                              {domain.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SKILLS */}
                    <div className="min-h-0 flex-1 p-2.5">
                      <div
                        className="
                          grid grid-cols-1 gap-1.5
                          sm:grid-cols-2
                          xl:grid-cols-2
                        "
                      >
                        {enabledSkills.map((skill) => {
                          const rating = Math.max(
                            0,
                            Math.min(10, skill.rating),
                          );

                          return (
                            <article
                              key={skill.id}
                              className={`
                                relative min-w-0
                                rounded-xl border
                                ${accent.skill}
                                px-2.5 py-2
                              `}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <h3
                                  className="
                                    min-w-0 flex-1
                                    truncate
                                    text-[12px] font-bold
                                    leading-4 text-slate-800
                                  "
                                  title={skill.name}
                                >
                                  {skill.name}
                                </h3>

                                {rating > 0 && (
                                  <CheckCircle2
                                    size={11}
                                    className="mt-0.5 shrink-0 text-emerald-500"
                                  />
                                )}
                              </div>

                              <div className="mt-1.5 flex items-center gap-2">
                                <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200/80">
                                  <div
                                    className={`
                                      h-full rounded-full
                                      bg-gradient-to-r
                                      ${accent.progress}
                                    `}
                                    style={{
                                      width: getRatingWidth(rating),
                                    }}
                                  />
                                </div>

                                <span className="shrink-0 text-[9px] font-bold text-slate-500">
                                  {rating > 0 ? rating : "—"}/10
                                </span>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}