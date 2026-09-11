"use client";

import {
  Award,
  BriefcaseBusiness,
  Code2,
  Home,
  type LucideIcon,
} from "lucide-react";

export type AppView = "home" | "skills" | "projects" | "certifications";

type AppShellProps = {
  activeView: AppView;
  onViewChange: (view: AppView) => void;
  children: React.ReactNode;
};

const navItems: {
  view: AppView;
  label: string;
  icon: LucideIcon;
}[] = [
  { view: "home", label: "About Me", icon: Home },
  { view: "skills", label: "Skills", icon: Code2 },
  { view: "projects", label: "Projects", icon: BriefcaseBusiness },
  { view: "certifications", label: "Certifications", icon: Award },
];

export default function AppShell({
  activeView,
  onViewChange,
  children,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_10%,rgba(16,185,129,0.22),transparent_25%),radial-gradient(circle_at_88%_8%,rgba(124,58,237,0.20),transparent_28%),linear-gradient(135deg,#050a10_0%,#11162a_48%,#061b1a_100%)]">
      <header className="border-b border-emerald-100/70 bg-white/90 shadow-[0_5px_24px_rgba(16,185,129,0.10)] backdrop-blur-xl">
        <div className="mx-auto max-w-[1480px] px-4 sm:px-7 lg:px-9">
          <nav className="flex min-h-[64px] items-center justify-center gap-4 overflow-x-auto py-3 sm:gap-6 lg:gap-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeView === item.view;

              return (
                <button
                  key={item.view}
                  type="button"
                  onClick={() => onViewChange(item.view)}
                  className={`
                    inline-flex shrink-0 items-center gap-2 rounded-xl
                    border px-4 py-2.5 text-sm font-semibold transition-all
                    ${
                      active
                        ? "border-emerald-300 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-[0_7px_24px_rgba(16,185,129,0.30)]"
                        : "border-slate-200 bg-white/85 text-slate-600 shadow-[0_3px_12px_rgba(15,23,42,0.03)] hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-[0_7px_20px_rgba(16,185,129,0.12)]"
                    }
                  `}
                >
                  <Icon size={15} />
                  {item.label}
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}
