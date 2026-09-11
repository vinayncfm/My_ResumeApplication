"use client";

import { useMemo, useState } from "react";
import {
  Award,
  BadgeCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Search,
  Star,
  X,
} from "lucide-react";

import certificationsData from "@/data/certifications.json";

type Certification = {
  id: string;
  name: string;
  issuingOrganization: string;
  technology: string;
  technologies: string[];
  category: string;
  level: string;
  credentialUrl: string;
  credentialId: string;
  dateObtained: string;
  expiryDate: string;
  enabled: boolean;
  featured: boolean;
};

const CERTIFICATIONS_PER_PAGE = 6;

const categoryStyles = [
  {
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    icon: "bg-blue-50 text-blue-600",
  },
  {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: "bg-emerald-50 text-emerald-600",
  },
  {
    badge: "border-violet-200 bg-violet-50 text-violet-700",
    icon: "bg-violet-50 text-violet-600",
  },
  {
    badge: "border-orange-200 bg-orange-50 text-orange-700",
    icon: "bg-orange-50 text-orange-600",
  },
  {
    badge: "border-cyan-200 bg-cyan-50 text-cyan-700",
    icon: "bg-cyan-50 text-cyan-600",
  },
];

function formatDate(value: string) {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function CertificationsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);

  const certifications = certificationsData.certifications as Certification[];

  const enabledCertifications = certifications.filter(
    (certification) => certification.enabled,
  );

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        enabledCertifications.map(
          (certification) => certification.category,
        ),
      ),
    );

    return ["All", ...uniqueCategories];
  }, [enabledCertifications]);

  const filteredCertifications = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return enabledCertifications.filter((certification) => {
      const matchesCategory =
        categoryFilter === "All" ||
        certification.category === categoryFilter;

      const matchesFeatured =
        !featuredOnly || certification.featured;

      const searchableText = [
        certification.name,
        certification.issuingOrganization,
        certification.technology,
        certification.category,
        certification.level,
        certification.credentialId,
        ...certification.technologies,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);

      return (
        matchesCategory &&
        matchesFeatured &&
        matchesSearch
      );
    });
  }, [
    enabledCertifications,
    searchTerm,
    categoryFilter,
    featuredOnly,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredCertifications.length / CERTIFICATIONS_PER_PAGE,
    ),
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages,
  );

  const visibleCertifications =
    filteredCertifications.slice(
      (safeCurrentPage - 1) * CERTIFICATIONS_PER_PAGE,
      safeCurrentPage * CERTIFICATIONS_PER_PAGE,
    );

  const startCertification =
    filteredCertifications.length === 0
      ? 0
      : (safeCurrentPage - 1) * CERTIFICATIONS_PER_PAGE + 1;

  const endCertification = Math.min(
    safeCurrentPage * CERTIFICATIONS_PER_PAGE,
    filteredCertifications.length,
  );

  function handleSearchChange(value: string) {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  function handleCategoryChange(value: string) {
    setCategoryFilter(value);
    setCurrentPage(1);
  }

  function handleFeaturedChange() {
  setFeaturedOnly(false);
  setCurrentPage(1);
}

  function openCertification(
    certification: Certification,
  ) {
    setSelectedCertification(certification);
  }

  function closeCertification() {
    setSelectedCertification(null);
  }

  return (
    <>
      <section
        id="certifications"
        className="h-[calc(100vh-78px)] overflow-hidden"
      >
        <div className="h-full px-5 py-5 sm:px-7 lg:px-8">
          <div className="mx-auto flex h-full max-w-7xl flex-col">
            {/* Header */}
            <section className="water-surface relative shrink-0 overflow-hidden rounded-3xl border border-slate-200/80 shadow-[0_8px_35px_rgba(37,99,235,0.05)]">
              <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-violet-100/40 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-100/30 blur-3xl" />

              <div className="relative z-10 px-6 py-5 sm:px-8 sm:py-6">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 shadow-sm">
                      <BadgeCheck
                        size={13}
                        className="text-violet-500"
                      />
                      Professional Credentials
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                      Certifications
                    </h2>

                    <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-600 sm:text-sm">
                      Professional certifications and technical
                      credentials across AI, automation, software
                      engineering and infrastructure.
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2.5">
                    <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                      <p className="text-xl font-bold text-slate-950">
                        {enabledCertifications.length}
                      </p>

                      <p className="text-[10px] font-medium text-slate-500">
                        Certifications
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-sm">
                      <p className="text-xl font-bold text-slate-950">
                        {
                          enabledCertifications.filter(
                            (certification) =>
                              certification.featured,
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
                      handleSearchChange(
                        event.target.value,
                      )
                    }
                    placeholder="Search certifications or technologies..."
                    className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:border-violet-300 focus:bg-white"
                  />
                </div>

                {/* Category filters */}
                <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                  {categories
                    .slice(0, 6)
                    .map((category) => {
                      const selected =
                        categoryFilter === category;

                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() =>
                            handleCategoryChange(
                              category,
                            )
                          }
                          className={`max-w-[170px] truncate rounded-lg border px-3 py-1.5 text-[11px] font-bold transition ${
                            selected
                              ? "border-violet-500 bg-violet-600 text-white shadow-sm"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                          }`}
                        >
                          {category}
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
                      fill={
                        featuredOnly
                          ? "currentColor"
                          : "none"
                      }
                    />

                    Featured
                  </button>
                </div>

                {/* Result count */}
                <div className="shrink-0 text-right text-[11px] font-medium text-slate-400">
                  {filteredCertifications.length ===
                  0
                    ? "No certifications found"
                    : `${startCertification}–${endCertification} of ${filteredCertifications.length}`}
                </div>
              </div>
            </section>

            {/* Certification grid */}
            <section className="mt-3 min-h-0 flex-1">
              {visibleCertifications.length > 0 ? (
                <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2">
                  {visibleCertifications.map(
                    (certification, index) => {
                      const style =
                        categoryStyles[
                          index %
                            categoryStyles.length
                        ];

                      return (
                        <article
                          key={certification.id}
                          className="group relative flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_8px_22px_rgba(124,58,237,0.09)]"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
                            >
                              <Award
                                size={17}
                                strokeWidth={1.9}
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <p className="truncate text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
                                  {
                                    certification.issuingOrganization
                                  }
                                </p>

                                {certification.featured && (
                                  <Star
                                    size={12}
                                    className="shrink-0 text-amber-500"
                                    fill="currentColor"
                                  />
                                )}
                              </div>

                              <h3 className="mt-1 line-clamp-2 text-[14px] font-bold leading-5 text-slate-900">
                                {certification.name}
                              </h3>
                            </div>
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            <span
                              className={`rounded-md border px-2 py-1 text-[9px] font-bold ${style.badge}`}
                            >
                              {certification.category}
                            </span>

                            <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-bold text-slate-500">
                              {certification.level}
                            </span>
                          </div>

                          <p className="mt-2 text-[10px] font-semibold text-slate-500">
                            Primary technology:{" "}
                            <span className="text-slate-700">
                              {certification.technology}
                            </span>
                          </p>

                          <div className="mt-2 flex min-w-0 gap-1 overflow-hidden">
                            {certification.technologies
                              .slice(0, 3)
                              .map((technology) => (
                                <span
                                  key={technology}
                                  className="shrink-0 rounded-md bg-slate-50 px-1.5 py-1 text-[9px] font-semibold text-slate-500"
                                >
                                  {technology}
                                </span>
                              ))}

                            {certification
                              .technologies.length >
                              3 && (
                              <span className="shrink-0 rounded-md bg-slate-50 px-1.5 py-1 text-[9px] font-semibold text-slate-400">
                                +
                                {certification
                                  .technologies
                                  .length - 3}
                              </span>
                            )}
                          </div>

                          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-2.5">
                            <div className="flex items-center gap-1.5 text-[9px] font-medium text-slate-400">
                              <CalendarDays size={11} />

                              {certification.dateObtained
                                ? `Obtained ${formatDate(
                                    certification.dateObtained,
                                  )}`
                                : "Date not specified"}
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                openCertification(
                                  certification,
                                )
                              }
                              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold text-violet-600 transition hover:bg-violet-50 hover:text-violet-700"
                            >
                              View Details
                              <ExternalLink
                                size={11}
                              />
                            </button>
                          </div>
                        </article>
                      );
                    },
                  )}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white">
                  <div className="text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                      <Search size={18} />
                    </div>

                    <p className="mt-3 text-sm font-bold text-slate-700">
                      No matching certifications
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Try another search term or remove a
                      filter.
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Pagination */}
            <section className="mt-3 flex shrink-0 items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-[0_2px_8px_rgba(15,23,42,0.03)]">
              <p className="text-[10px] font-medium text-slate-400">
                {filteredCertifications.length ===
                0
                  ? "0 certifications"
                  : `Showing ${startCertification}–${endCertification}`}
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={safeCurrentPage <= 1}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.max(1, page - 1),
                    )
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Previous certifications"
                >
                  <ChevronLeft size={14} />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  )
                    .slice(0, 7)
                    .map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() =>
                          setCurrentPage(page)
                        }
                        className={`flex h-7 min-w-7 items-center justify-center rounded-lg px-2 text-[10px] font-bold transition ${
                          safeCurrentPage === page
                            ? "bg-violet-600 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                </div>

                <button
                  type="button"
                  disabled={
                    safeCurrentPage >= totalPages
                  }
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(
                        totalPages,
                        page + 1,
                      ),
                    )
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Next certifications"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Certification detail overlay */}
      {selectedCertification && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-4 py-6 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeCertification();
            }
          }}
        >
          <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.2)]">
            {/* Modal header */}
            <div className="water-surface shrink-0 border-b border-slate-200 px-6 py-5 sm:px-7">
              <button
                type="button"
                onClick={closeCertification}
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-slate-300 hover:text-slate-800"
                aria-label="Close certification details"
              >
                <X size={15} />
              </button>

              <div className="pr-12">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md border border-violet-200 bg-violet-50 px-2 py-1 text-[9px] font-bold text-violet-700">
                    {selectedCertification.category}
                  </span>

                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] font-bold text-slate-600">
                    {selectedCertification.level}
                  </span>

                  {selectedCertification.featured && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1 text-[9px] font-bold text-amber-700">
                      <Star
                        size={10}
                        fill="currentColor"
                      />
                      Featured
                    </span>
                  )}
                </div>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                  {selectedCertification.name}
                </h2>

                <p className="mt-1 text-sm font-semibold text-slate-500">
                  {selectedCertification.issuingOrganization}
                </p>
              </div>
            </div>

            {/* Modal body */}
            <div className="min-h-0 overflow-y-auto px-6 py-5 sm:px-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                    Primary Technology
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-700">
                    {selectedCertification.technology}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                    Level
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-700">
                    {selectedCertification.level}
                  </p>
                </div>
              </div>

              <section className="mt-5">
                <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                  Technologies Covered
                </h3>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedCertification.technologies.map(
                    (technology) => (
                      <span
                        key={technology}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600"
                      >
                        {technology}
                      </span>
                    ),
                  )}
                </div>
              </section>

              <section className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-white px-4 py-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                    Date Obtained
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    {selectedCertification.dateObtained
                      ? formatDate(
                          selectedCertification.dateObtained,
                        )
                      : "Not specified"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-white px-4 py-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                    Expiry Date
                  </p>

                  <p className="mt-1 text-xs font-semibold text-slate-700">
                    {selectedCertification.expiryDate
                      ? formatDate(
                          selectedCertification.expiryDate,
                        )
                      : "No expiry specified"}
                  </p>
                </div>
              </section>

              {selectedCertification.credentialId && (
                <section className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                    Credential ID
                  </p>

                  <p className="mt-1 break-all text-xs font-semibold text-slate-700">
                    {selectedCertification.credentialId}
                  </p>
                </section>
              )}

              {selectedCertification.credentialUrl && (
                <section className="mt-5 border-t border-slate-100 pt-4">
                  <a
                    href={
                      selectedCertification.credentialUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-violet-700"
                  >
                    <BadgeCheck size={14} />
                    View Credential
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