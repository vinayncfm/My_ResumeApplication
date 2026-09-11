"use client";

import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Layers3,
  Search,
  Star,
  UserRound,
  X,
} from "lucide-react";

import projectsData from "@/data/projects.json";

type ProjectType = "Enterprise" | "POC" | "Personal" | "Open Source";

type Project = {
  id: string;
  name: string;
  domain: string;
  role: string;
  description: string;
  projectType: ProjectType;
  technologies: string[];
  keyContributions: string[];
  enabled: boolean;
  featured: boolean;
  links?: {
    github?: string;
  };
};

const projectTypeClasses: Record<
  ProjectType,
  {
    badge: string;
    icon: string;
  }
> = {
  Enterprise: {
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    icon: "bg-blue-50 text-blue-600",
  },
  POC: {
    badge: "border-violet-200 bg-violet-50 text-violet-700",
    icon: "bg-violet-50 text-violet-600",
  },
  Personal: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: "bg-emerald-50 text-emerald-600",
  },
  "Open Source": {
    badge: "border-orange-200 bg-orange-50 text-orange-700",
    icon: "bg-orange-50 text-orange-600",
  },
};

const projectTypeOptions: Array<"All" | ProjectType> = [
  "All",
  "Enterprise",
  "POC",
  "Personal",
  "Open Source",
];

const PROJECTS_PER_PAGE = 6;

function getDescription(description: string) {
  return description.trim();
}

export default function ProjectsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<"All" | ProjectType>("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const enabledProjects = projectsData.projects.filter(
    (project) => project.enabled,
  ) as Project[];

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return enabledProjects.filter((project) => {
      const matchesType =
        typeFilter === "All" || project.projectType === typeFilter;

      const matchesFeatured = !featuredOnly || project.featured;

      const searchableText = [
        project.name,
        project.domain,
        project.role,
        project.description,
        project.projectType,
        ...project.technologies,
        ...project.keyContributions,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);

      return matchesType && matchesFeatured && matchesSearch;
    });
  }, [enabledProjects, searchTerm, typeFilter, featuredOnly]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const visibleProjects = filteredProjects.slice(
    (safeCurrentPage - 1) * PROJECTS_PER_PAGE,
    safeCurrentPage * PROJECTS_PER_PAGE,
  );

  const startProject =
    filteredProjects.length === 0
      ? 0
      : (safeCurrentPage - 1) * PROJECTS_PER_PAGE + 1;

  const endProject = Math.min(
    safeCurrentPage * PROJECTS_PER_PAGE,
    filteredProjects.length,
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  function handleTypeChange(value: "All" | ProjectType) {
    setTypeFilter(value);
    setCurrentPage(1);
  }

  function handleFeaturedChange() {
    setFeaturedOnly((current) => !current);
    setCurrentPage(1);
  }

  function openProject(project: Project) {
    setSelectedProject(project);
  }

  function closeProject() {
    setSelectedProject(null);
  }

  return (
    <>
      <section
        id="projects"
        className="h-[calc(100vh-78px)] overflow-hidden"
      >
        <div className="h-full px-5 py-5 sm:px-7 lg:px-8">
          <div className="mx-auto flex h-full max-w-7xl flex-col">
            {/* Header */}
            <section className="water-surface relative shrink-0 overflow-hidden rounded-3xl border border-slate-200/80 shadow-[0_8px_35px_rgba(37,99,235,0.05)]">
              <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-emerald-100/30 blur-3xl" />

              <div className="relative z-10 px-6 py-5 sm:px-8 sm:py-6">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 shadow-sm">
                      <Layers3 size={13} className="text-blue-500" />
                      Professional Portfolio
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                      Projects
                    </h2>

                    <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-600 sm:text-sm">
                      Selected enterprise, AI, automation, engineering and
                      personal projects across my professional journey.
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2.5">
                    <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                      <p className="text-xl font-bold text-slate-950">
                        {enabledProjects.length}
                      </p>
                      <p className="text-[10px] font-medium text-slate-500">
                        Projects
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                      <p className="text-xl font-bold text-slate-950">
                        {
                          enabledProjects.filter(
                            (project) => project.featured,
                          ).length
                        }
                      </p>
                      <p className="text-[10px] font-medium text-slate-500">
                        Featured
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Controls */}
            <section className="mt-3 shrink-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                {/* Search */}
                <div className="relative min-w-0 flex-1 xl:max-w-sm">
                  <Search
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) =>
                      handleSearchChange(event.target.value)
                    }
                    placeholder="Search projects, domains, technologies..."
                    className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white"
                  />
                </div>

                {/* Type filters */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {projectTypeOptions.map((option) => {
                    const selected = typeFilter === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleTypeChange(option)}
                        className={`rounded-lg border px-3 py-1.5 text-[11px] font-bold transition ${
                          selected
                            ? "border-blue-500 bg-blue-600 text-white shadow-sm"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={handleFeaturedChange}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-bold transition ${
                      featuredOnly
                        ? "border-amber-400 bg-amber-500 text-white shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                  >
                    <Star
                      size={12}
                      fill={featuredOnly ? "currentColor" : "none"}
                    />
                    Featured
                  </button>
                </div>

                {/* Result count */}
                <div className="shrink-0 text-right text-[11px] font-medium text-slate-400">
                  {filteredProjects.length === 0
                    ? "No projects found"
                    : `${startProject}–${endProject} of ${filteredProjects.length}`}
                </div>
              </div>
            </section>

            {/* Project grid */}
            <section className="mt-3 min-h-0 flex-1">
              {visibleProjects.length > 0 ? (
                <div className="grid h-full grid-cols-1 grid-rows-6 gap-3 sm:grid-cols-2 sm:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2">
                  {visibleProjects.map((project) => {
                    const typeStyle =
                      projectTypeClasses[project.projectType];

                    return (
                      <article
                        key={project.id}
                        className="group relative flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_22px_rgba(37,99,235,0.09)]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
                              {project.domain}
                            </p>

                            <h3 className="mt-1 truncate text-[15px] font-bold leading-5 text-slate-900">
                              {project.name}
                            </h3>
                          </div>

                          <span
                            className={`shrink-0 rounded-md border px-2 py-1 text-[9px] font-bold ${typeStyle.badge}`}
                          >
                            {project.projectType}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                          <UserRound size={12} className="text-slate-400" />
                          <span className="truncate">{project.role}</span>
                        </div>

                        <p className="mt-2 line-clamp-3 text-[11px] leading-[1.45] text-slate-600">
                          {getDescription(project.description)}
                        </p>

                        <div className="mt-auto pt-3">
                          <div className="flex min-w-0 items-center gap-1.5">
                            <Code2
                              size={12}
                              className="shrink-0 text-slate-400"
                            />

                            <div className="flex min-w-0 flex-nowrap gap-1 overflow-hidden">
                              {project.technologies
                                .slice(0, 4)
                                .map((technology) => (
                                  <span
                                    key={technology}
                                    className="shrink-0 rounded-md bg-slate-100 px-1.5 py-1 text-[9px] font-semibold text-slate-600"
                                  >
                                    {technology}
                                  </span>
                                ))}

                              {project.technologies.length > 4 && (
                                <span className="shrink-0 rounded-md bg-slate-50 px-1.5 py-1 text-[9px] font-semibold text-slate-400">
                                  +{project.technologies.length - 4}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
                            <div className="flex items-center gap-2">
                              {project.featured && (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-600">
                                  <Star size={10} fill="currentColor" />
                                  Featured
                                </span>
                              )}
                            {project.links?.github && (
                            <Code2 size={13} className="text-slate-500" />
                            )}
                            </div>

                            <button
                              type="button"
                              onClick={() => openProject(project)}
                              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold text-blue-600 transition hover:bg-blue-50 hover:text-blue-700"
                            >
                              View Details
                              <ExternalLink size={11} />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white">
                  <div className="text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                      <Search size={18} />
                    </div>

                    <p className="mt-3 text-sm font-bold text-slate-700">
                      No matching projects
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try another search term or remove a filter.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Pagination */}
            <section className="mt-3 flex shrink-0 items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
              <p className="text-[10px] font-medium text-slate-400">
                {filteredProjects.length === 0
                  ? "0 projects"
                  : `Showing ${startProject}–${endProject}`}
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={safeCurrentPage <= 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Previous projects"
                >
                  <ChevronLeft size={14} />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, index) => index + 1)
                    .slice(0, 7)
                    .map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-[10px] font-bold transition ${
                          safeCurrentPage === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                </div>

                <button
                  type="button"
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1),
                    )
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Next projects"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Project detail overlay */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 py-6 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeProject();
            }
          }}
        >
          <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.2)]">
            {/* Modal header */}
            <div className="water-surface shrink-0 border-b border-slate-200 px-6 py-5 sm:px-7">
              <button
                type="button"
                onClick={closeProject}
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-800"
                aria-label="Close project details"
              >
                <X size={15} />
              </button>

              <div className="pr-12">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-blue-50 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-blue-700">
                    {selectedProject.domain}
                  </span>

                  <span
                    className={`rounded-md border px-2 py-1 text-[9px] font-bold ${
                      projectTypeClasses[selectedProject.projectType].badge
                    }`}
                  >
                    {selectedProject.projectType}
                  </span>

                  {selectedProject.featured && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-700">
                      <Star size={10} fill="currentColor" />
                      Featured
                    </span>
                  )}
                </div>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                  {selectedProject.name}
                </h2>

                <div className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <BriefcaseBusiness size={13} />
                  {selectedProject.role}
                </div>
              </div>
            </div>

            {/* Modal body */}
            <div className="min-h-0 overflow-y-auto px-6 py-5 sm:px-7">
              <section>
                <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                  Project Description
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {selectedProject.description}
                </p>
              </section>

              <section className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                  Technologies
                </h3>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </section>

              <section className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                  Key Contributions
                </h3>

                <div className="mt-2 space-y-2">
                  {selectedProject.keyContributions
                    .slice(0, 3)
                    .map((contribution, index) => (
                      <div
                        key={`${selectedProject.id}-contribution-${index}`}
                        className="flex gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[9px] font-bold text-blue-600">
                          {index + 1}
                        </span>

                        <p className="text-xs leading-5 text-slate-600">
                          {contribution}
                        </p>
                      </div>
                    ))}
                </div>
              </section>

              {selectedProject.links?.github && (
                <section className="mt-5 border-t border-slate-100 pt-4">
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                  >
                    <Code2 size={13} className="text-slate-500" /> size={14} /
                    View GitHub Repository
                    <ExternalLink size={12} />
                  </a>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}