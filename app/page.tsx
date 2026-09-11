"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Award,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  Layers3,
  Network,
  Rocket,
  Server,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

import AppShell from "@/components/layout/app_shell";
import SkillsSection from "@/components/skills/skills_section";
import ProjectsSection from "@/components/projects/projects_section";
import CertificationsSection from "@/components/certifications/certifications_section";
import profile from "@/data/profile.json";

type AppView = "home" | "skills" | "projects" | "certifications";

type JourneyRole = {
  title: string;
  period: string;
  responsibilities: string[];
};

type JourneyItem = {
  id: string;
  company: string;
  period: string;
  duration: string;
  role: string;
  summary: string;
  journeySnapshot: string;
  roles: JourneyRole[];
  enabled?: boolean;
};

type ExpertiseTechnology = {
  name: string;
  enabled?: boolean;
};

type ExpertiseGroup = {
  id: string;
  name: string;
  enabled?: boolean;
  technologies: ExpertiseTechnology[];
};

const stats = [
  {
    value: profile.experience.totalYears,
    label: "Years Experience",
    icon: BriefcaseBusiness,
    iconClass: "bg-orange-50 text-orange-600",
    detail:
      "12+ years of professional experience across software testing, RPA, automation, solution architecture, technical leadership and AI Agent development.",
  },
  {
    value: profile.experience.aiAgentsYears,
    label: "Years AI Agents",
    icon: Cpu,
    iconClass: "bg-blue-50 text-blue-600",
    detail:
      "3+ years of hands-on experience in AI Agent development and solution architecture, including agent workflows, orchestration, integrations and architecture.",
  },
  {
    value: profile.experience.rpaYears,
    label: "Years Enterprise Automation",
    icon: Workflow,
    iconClass: "bg-emerald-50 text-emerald-600",
    detail:
      "8+ years of enterprise automation experience across UiPath, Power Automate, Python, VBA, JavaScript, n8n and RPA solution delivery.",
  },
  {
    value: profile.experience.stackEngineering,
    label: "Stack Engineering",
    icon: Code2,
    iconClass: "bg-violet-50 text-violet-600",
    detail:
      "Full-stack engineering experience across web applications, APIs, integrations, backend development and application deployment.",
  },
];

const journeyColors = [
  {
    ring: "border-emerald-300",
    badge: "bg-emerald-500",
    soft: "bg-emerald-50",
    text: "text-emerald-700",
    icon: Cpu,
  },
  {
    ring: "border-violet-300",
    badge: "bg-violet-500",
    soft: "bg-violet-50",
    text: "text-violet-700",
    icon: Network,
  },
  {
    ring: "border-blue-300",
    badge: "bg-blue-500",
    soft: "bg-blue-50",
    text: "text-blue-700",
    icon: Users,
  },
  {
    ring: "border-orange-300",
    badge: "bg-orange-500",
    soft: "bg-orange-50",
    text: "text-orange-700",
    icon: Code2,
  },
  {
    ring: "border-pink-300",
    badge: "bg-pink-500",
    soft: "bg-pink-50",
    text: "text-pink-700",
    icon: BarChart3,
  },
  {
    ring: "border-cyan-300",
    badge: "bg-cyan-500",
    soft: "bg-cyan-50",
    text: "text-cyan-700",
    icon: ShieldCheck,
  },
];

const expertiseGroupIcons = [
  Cpu,
  Code2,
  Workflow,
  Database,
  Network,
  Layers3,
  Users,
  BriefcaseBusiness,
  Server,
];

const expertiseColors = [
  "text-blue-700",
  "text-emerald-700",
  "text-violet-700",
  "text-orange-700",
  "text-cyan-700",
  "text-indigo-700",
  "text-pink-700",
  "text-amber-700",
  "text-slate-700",
];

function getJourneyItems(): JourneyItem[] {
  return (profile.professionalJourney as JourneyItem[]).filter(
    (item) => item.enabled !== false,
  );
}

function getExpertiseGroups(): ExpertiseGroup[] {
  return (profile.expertiseGroups as ExpertiseGroup[])
    .filter((group) => group.enabled !== false)
    .map((group) => ({
      ...group,
      technologies: group.technologies.filter(
        (technology) => technology.enabled !== false,
      ),
    }))
    .filter((group) => group.technologies.length > 0);
}

function getJourneyColor(index: number) {
  return journeyColors[index % journeyColors.length];
}

function getExpertiseIcon(index: number) {
  return expertiseGroupIcons[index % expertiseGroupIcons.length];
}

function getExpertiseColor(index: number) {
  return expertiseColors[index % expertiseColors.length];
}

function AboutMeView() {
  const [activeStat, setActiveStat] = useState<number | null>(null);
  const [journeyMode, setJourneyMode] = useState<"overview" | "details">(
    "overview",
  );
  const [journeyPage, setJourneyPage] = useState(0);

  const journeyItems = useMemo(() => getJourneyItems(), []);
  const expertiseGroups = useMemo(() => getExpertiseGroups(), []);

  const activeJourney =
    journeyItems.length > 0 ? journeyItems[journeyPage] : null;

  const activeJourneyColor =
    journeyItems.length > 0
      ? getJourneyColor(journeyPage)
      : journeyColors[0];

  const ActiveJourneyIcon = activeJourneyColor.icon;

  const openJourney = () => {
    if (!journeyItems.length) return;
    setJourneyPage(0);
    setJourneyMode("details");
  };

  const closeJourney = () => setJourneyMode("overview");

  const previousJourney = () =>
    setJourneyPage((current) => Math.max(0, current - 1));

  const nextJourney = () =>
    setJourneyPage((current) =>
      Math.min(journeyItems.length - 1, current + 1),
    );

  return (
    <>
      <main
        className="h-[calc(100vh-64px)] overflow-hidden bg-[radial-gradient(circle_at_12%_20%,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_88%_10%,rgba(124,58,237,0.18),transparent_30%),linear-gradient(135deg,#050b12_0%,#10152a_48%,#071c1b_100%)] px-3 py-2 sm:px-5 lg:px-7"
        style={{
          fontFamily:
            '"Segoe UI Variable", "Segoe UI", system-ui, sans-serif',
        }}
      >
        <div className="mx-auto h-full max-w-[1400px]">
          <section
            className="
              relative h-full overflow-hidden rounded-[28px]
              border border-white/70 bg-gradient-to-br
              from-slate-50 via-white to-emerald-50
              shadow-[0_18px_60px_rgba(15,23,42,0.22)]
            "
          >
            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-cyan-200/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

            <div className="relative z-10 h-full p-4 sm:p-5 lg:p-6">
              {journeyMode === "overview" ? (
                <div className="flex h-full min-h-0 flex-col">
                  <div className="grid shrink-0 gap-5 lg:grid-cols-[1.12fr_0.88fr]">
                    <div>
                      <h1 className="text-[44px] font-semibold leading-none tracking-[-0.04em] text-[#1769ff] sm:text-[48px] lg:text-[52px]">
                        {profile.identity.name}
                      </h1>

                      <h2 className="mt-2 text-lg font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#155eef] via-[#087ea4] to-[#059669] sm:text-xl lg:text-[22px]">
                        {profile.identity.headline}
                      </h2>

                      <p className="mt-2 max-w-4xl text-[12px] font-medium leading-5 text-slate-600 sm:text-[12.5px]">
                        {profile.about.summary[0]}
                      </p>

                      <p className="mt-1.5 max-w-4xl text-[12px] font-medium leading-5 text-slate-600 sm:text-[12.5px]">
                        {profile.about.summary[1]}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 self-start">
                      {stats.map((stat, index) => {
                        const Icon = stat.icon;

                        return (
                          <button
                            key={stat.label}
                            type="button"
                            onClick={() => setActiveStat(index)}
                            className="
                              group min-h-[96px] rounded-2xl border
                              border-white/90 bg-white/90 p-3 text-left
                              shadow-[0_6px_20px_rgba(15,23,42,0.06)]
                              backdrop-blur transition hover:-translate-y-1
                              hover:shadow-[0_10px_25px_rgba(15,23,42,0.10)]
                            "
                          >
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.iconClass}`}
                            >
                              <Icon size={18} />
                            </div>

                            <div className="mt-2 text-xl font-semibold text-slate-950">
                              {stat.value}
                            </div>

                            <div className="mt-0.5 text-[9px] font-medium text-slate-500">
                              {stat.label}
                            </div>

                            <div className="mt-1 text-[9px] font-bold text-blue-600 opacity-0 transition group-hover:opacity-100">
                              View details →
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-3 grid min-h-0 flex-1 items-stretch gap-4 lg:grid-cols-2">
                    <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_5px_20px_rgba(15,23,42,0.05)]">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                          <Layers3 size={20} />
                        </div>
                        <div>
                          <h2 className="text-[20px] font-semibold tracking-tight text-slate-950">
                            Core Expertise
                          </h2>
                          <p className="mt-0.5 text-xs text-slate-500">
                            Technologies and areas of professional experience.
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                        {expertiseGroups.map((group, index) => {
                          const GroupIcon = getExpertiseIcon(index);
                          const color = getExpertiseColor(index);

                          return (
                            <div key={group.id} className="min-w-0">
                              <div className="flex min-w-0 items-start gap-2">
                                <GroupIcon
                                  size={14}
                                  className={`mt-1 shrink-0 ${color}`}
                                />

                                <div className="min-w-0 text-[13.5px] leading-5.5">
                                  <span className={`font-semibold ${color}`}>
                                    {group.name}:
                                  </span>{" "}
                                  <span className="font-normal text-slate-600">
                                    {group.technologies.map(
                                      (technology, technologyIndex) => (
                                        <span key={technology.name}>
                                          {technologyIndex > 0 && (
                                            <span className="text-slate-300">
                                              ,{" "}
                                            </span>
                                          )}
                                          {technology.name}
                                        </span>
                                      ),
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>

                    <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_5px_20px_rgba(15,23,42,0.05)]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                            <BriefcaseBusiness size={20} />
                          </div>

                          <div>
                            <h2 className="text-[20px] font-semibold tracking-tight text-slate-950">
                              Professional Journey
                            </h2>
                            <p className="mt-0.5 text-xs text-slate-500">
                              From business engagement to AI Agent and
                              automation leadership.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={openJourney}
                          className="
                            shrink-0 rounded-xl bg-gradient-to-r
                            from-blue-600 to-cyan-500 px-3.5 py-2.5
                            text-[10px] font-bold text-white shadow-sm
                            transition hover:-translate-y-0.5 hover:shadow-md
                          "
                        >
                          See Full Journey →
                        </button>
                      </div>

                      <div className="relative mt-3 min-h-0">
                        <div className="absolute bottom-3 left-[14px] top-3 w-[2px] rounded-full bg-slate-200" />

                        <div className="space-y-1.5">
                          {journeyItems.map((item, index) => {
                            const colors = getJourneyColor(index);
                            const Icon = colors.icon;

                            return (
                              <div
                                key={item.id}
                                className="relative flex min-w-0 items-center gap-2.5"
                              >
                                <div
                                  className={`
                                    relative z-10 flex h-7 w-7 shrink-0
                                    items-center justify-center rounded-full
                                    border-2 bg-white ${colors.ring}
                                  `}
                                >
                                  <span
                                    className={`
                                      flex h-5 w-5 items-center justify-center
                                      rounded-full text-[8px] font-bold text-white
                                      ${colors.badge}
                                    `}
                                  >
                                    {String(index + 1).padStart(2, "0")}
                                  </span>
                                </div>

                                <div
                                  className={`
                                    min-w-0 flex-1 rounded-xl px-3 py-2
                                    ${colors.soft}
                                  `}
                                >
                                  <div className="flex min-w-0 items-center gap-1.5">
                                    <Icon
                                      size={12}
                                      className={`shrink-0 ${colors.text}`}
                                    />
                                    <h3
                                      className={`
                                        min-w-0 flex-1 truncate text-[11px]
                                        font-semibold text-slate-900
                                      `}
                                    >
                                      {item.role}
                                    </h3>
                                  </div>

                                  <p className="mt-0.5 truncate text-[8.5px] leading-3.5 text-slate-600">
                                    {item.summary}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              ) : (
                <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
                  <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-blue-50 px-5 py-4 sm:px-7">
                    <div className="flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={closeJourney}
                        className="
                          inline-flex items-center gap-2 rounded-xl border
                          border-slate-200 bg-white px-3 py-2 text-[11px]
                          font-bold text-slate-600 transition hover:border-blue-200
                          hover:text-blue-700
                        "
                      >
                        <ArrowLeft size={14} />
                        Back
                      </button>

                      <div className="text-center">
                        <div className="text-sm font-bold text-slate-950">
                          Professional Journey
                        </div>
                        <div className="text-[10px] font-medium text-slate-500">
                          Career progression and responsibilities
                        </div>
                      </div>

                      <div className="text-right text-[11px] font-bold text-slate-500">
                        {journeyPage + 1} / {journeyItems.length}
                      </div>
                    </div>

                    <div className="mt-3 flex justify-center gap-1.5">
                      {journeyItems.map((item, index) => (
                        <button
                          key={item.id}
                          type="button"
                          aria-label={`Go to ${item.role}`}
                          onClick={() => setJourneyPage(index)}
                          className={`h-1.5 rounded-full transition-all ${
                            index === journeyPage
                              ? "w-7 bg-blue-600"
                              : "w-1.5 bg-slate-300 hover:bg-slate-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {activeJourney && (
                    <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-7">
                      <div className="min-h-0 flex-1 overflow-y-auto grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
                        <div className="min-w-0">
                          <div className="flex items-start gap-4">
                            <div
                              className={`
                                flex h-13 w-13 shrink-0 items-center justify-center
                                rounded-2xl text-white shadow-md
                                ${activeJourneyColor.badge}
                              `}
                            >
                              <ActiveJourneyIcon size={23} />
                            </div>

                            <div className="min-w-0">
                              <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">
                                {activeJourney.role}
                              </h2>

                              <div className="mt-2 flex flex-wrap gap-2">
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-700">
                                  {activeJourney.company}
                                </span>
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600">
                                  {activeJourney.period}
                                </span>
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700">
                                  {activeJourney.duration}
                                </span>
                              </div>

                              <p className="mt-3 text-sm leading-6 text-slate-600">
                                {activeJourney.summary}
                              </p>
                            </div>
                          </div>

                          <div
                            className={`
                              mt-6 rounded-2xl border p-5
                              ${activeJourneyColor.soft}
                              ${activeJourneyColor.ring}
                            `}
                          >
                            <div className="flex items-center gap-2">
                              <Rocket
                                size={17}
                                className={activeJourneyColor.text}
                              />
                              <h3
                                className={`text-sm font-bold ${activeJourneyColor.text}`}
                              >
                                Role Overview & Experience
                              </h3>
                            </div>

                            {activeJourney.journeySnapshot
                              .split("\n\n")
                              .map((paragraph) => (
                                <p
                                  key={paragraph}
                                  className="mt-3 text-sm leading-6 text-slate-700"
                                >
                                  {paragraph}
                                </p>
                              ))}
                          </div>

                          <div className="mt-6">
                            <h3 className="text-sm font-bold text-slate-900">
                              Roles & Responsibilities
                            </h3>

                            <div className="mt-3 space-y-4">
                              {activeJourney.roles.map((role) => (
                                <div
                                  key={`${activeJourney.id}-${role.title}`}
                                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
                                >
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <h4 className="text-sm font-bold text-slate-900">
                                      {role.title}
                                    </h4>
                                    <span className="text-[10px] font-bold text-slate-500">
                                      {role.period}
                                    </span>
                                  </div>

                                  <ul className="mt-3 space-y-2">
                                    {role.responsibilities.map(
                                      (responsibility) => (
                                        <li
                                          key={responsibility}
                                          className="flex gap-2 text-[12px] leading-5 text-slate-600"
                                        >
                                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                          <span>{responsibility}</span>
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <aside className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                          <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-400">
                            Career Progression
                          </div>

                          <div className="mt-1 text-sm font-bold text-slate-900">
                            Current → Earlier Roles
                          </div>

                          <div className="mt-4 space-y-1.5">
                            {journeyItems.map((item, index) => {
                              const colors = getJourneyColor(index);
                              const isActive = index === journeyPage;

                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => setJourneyPage(index)}
                                  className={`
                                    flex w-full items-center gap-2.5 rounded-xl
                                    border px-3 py-2.5 text-left transition
                                    ${
                                      isActive
                                        ? `${colors.soft} ${colors.ring}`
                                        : "border-transparent bg-white hover:border-slate-200"
                                    }
                                  `}
                                >
                                  <span
                                    className={`
                                      flex h-6 w-6 shrink-0 items-center justify-center
                                      rounded-full text-[9px] font-bold
                                      ${
                                        isActive
                                          ? `${colors.badge} text-white`
                                          : "bg-slate-100 text-slate-500"
                                      }
                                    `}
                                  >
                                    {String(index + 1).padStart(2, "0")}
                                  </span>

                                  <span
                                    className={`
                                      min-w-0 flex-1 truncate text-[11px] font-semibold
                                      ${
                                        isActive
                                          ? colors.text
                                          : "text-slate-600"
                                      }
                                    `}
                                  >
                                    {item.role}
                                  </span>

                                  {isActive && (
                                    <CheckCircle2
                                      size={13}
                                      className={colors.text}
                                    />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </aside>
                      </div>

                      <div className="mt-6 flex shrink-0 items-center justify-between border-t border-slate-200 pt-4">
                        <button
                          type="button"
                          onClick={previousJourney}
                          disabled={journeyPage === 0}
                          className="
                            inline-flex items-center gap-2 rounded-xl border
                            border-slate-200 bg-white px-3.5 py-2 text-xs
                            font-bold text-slate-600 transition hover:border-blue-200
                            hover:text-blue-700 disabled:cursor-not-allowed
                            disabled:opacity-40
                          "
                        >
                          <ChevronLeft size={15} />
                          Previous
                        </button>

                        <div className="hidden text-[11px] font-medium text-slate-400 sm:block">
                          {activeJourney.company}
                        </div>

                        <button
                          type="button"
                          onClick={nextJourney}
                          disabled={journeyPage === journeyItems.length - 1}
                          className="
                            inline-flex items-center gap-2 rounded-xl
                            bg-gradient-to-r from-blue-700 to-cyan-600
                            px-3.5 py-2 text-xs font-bold text-white shadow-md
                            transition hover:-translate-y-0.5 disabled:cursor-not-allowed
                            disabled:opacity-40
                          "
                        >
                          Next
                          <ChevronRight size={15} />
                        </button>
                      </div>
                    </div>
                  )}
                </section>
              )}
            </div>
          </section>
        </div>
      </main>

      {activeStat !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-5 backdrop-blur-[2px]"
          onMouseDown={() => setActiveStat(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stats[activeStat].iconClass}`}
                >
                  {(() => {
                    const Icon = stats[activeStat].icon;
                    return <Icon size={21} />;
                  })()}
                </div>

                <div className="mt-4 text-3xl font-bold text-slate-950">
                  {stats[activeStat].value}
                </div>

                <div className="text-sm font-semibold text-slate-500">
                  {stats[activeStat].label}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveStat(null)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-900"
              >
                Close
              </button>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              {stats[activeStat].detail}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState<AppView>("home");

  return (
    <AppShell activeView={activeView} onViewChange={setActiveView}>
      {activeView === "home" && <AboutMeView />}
      {activeView === "skills" && <SkillsSection />}
      {activeView === "projects" && <ProjectsSection />}
      {activeView === "certifications" && <CertificationsSection />}
    </AppShell>
  );
}