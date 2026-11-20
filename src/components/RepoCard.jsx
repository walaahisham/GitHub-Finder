export default function RepoCard({ repo }) {
  const updatedDate = new Date(repo.updated_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric"
    }
  )

  return (
    <article className="group relative flex flex-col h-full p-6 rounded-2xl bg-white dark:bg-[#111426] border border-gray-200 dark:border-violet-500/15 shadow-lg shadow-black/5 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-950/20 hover:-translate-y-2 transition-all duration-300 overflow-hidden">

      {/* Hover Glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

      {/* Header */}
      <div className="relative flex items-start justify-between gap-3">

        <div className="flex items-center gap-3 min-w-0">

          <div className="shrink-0 w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center text-violet-600 dark:text-violet-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-violet-500 transition">
              {repo.name}
            </h3>

            <span className="text-xs text-gray-400">
              Public Repository
            </span>
          </div>

        </div>

        <span className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400">
          Public
        </span>

      </div>

      {/* Description */}
      <p className="relative text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-5 min-h-12 line-clamp-2">
        {repo.description || "No description provided for this repository."}
      </p>

      {/* Repository Details */}
      <div className="relative flex flex-wrap items-center gap-x-5 gap-y-3 mt-6 text-sm text-gray-500 dark:text-gray-400">

        {repo.language && (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-violet-500"></span>
            <span>{repo.language}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5">
          <span>⭐</span>
          <span>{repo.stargazers_count.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span>🍴</span>
          <span>{repo.forks_count.toLocaleString()}</span>
        </div>

      </div>

      {/* Divider */}
      <div className="relative border-t border-gray-200 dark:border-gray-700/60 mt-6 mb-4"></div>

      {/* Footer */}
      <div className="relative flex items-center justify-between gap-3 mt-auto">

        <span className="text-xs text-gray-400">
          Updated {updatedDate}
        </span>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-purple-500 transition"
        >
          View Project
          <span className="group-hover:translate-x-1 transition-transform">
            ↗
          </span>
        </a>

      </div>

    </article>
  )
}