import RepoCard from "./RepoCard"

export default function Repositories({ repos, loadMore, loadingMore, hasMore }) {
  return (
    <section className="mt-14 animate-fade-up">

      {/* Title */}
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Latest Repositories
        </h2>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300">
          {repos.length} shown
        </span>
      </div>

      {/* Empty state */}
      {repos.length === 0 ? (
        <div className="p-10 rounded-2xl bg-white dark:bg-[#111426] border border-gray-200 dark:border-violet-500/15 text-center text-gray-500 dark:text-gray-400">
          This user has no public repositories.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg shadow-violet-600/20 hover:shadow-violet-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMore ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
                Loading...
              </>
            ) : (
              <>
                Load More
                <span>↓</span>
              </>
            )}
          </button>
        </div>
      )}

    </section>
  )
}