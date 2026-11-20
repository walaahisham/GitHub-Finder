export default function SearchBar({
  username,
  setUsername,
  searchUser,
  loading
}) {
  return (
    <section className="max-w-3xl mx-auto animate-fade-up">

      <form
        onSubmit={searchUser}
        className="relative flex flex-col sm:flex-row items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#151326] border border-gray-200 dark:border-violet-500/20 shadow-xl shadow-violet-500/5 focus-within:border-violet-500/60 focus-within:shadow-violet-500/10 transition-all duration-300"
      >

        <div className="flex items-center flex-1 w-full gap-3 px-3">

          <div className="text-violet-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Search GitHub username..."
            aria-label="GitHub username"
            autoComplete="off"
            className="w-full py-3 outline-none bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 text-sm md:text-base"
          />

          <span className="hidden md:block text-xs text-gray-400 border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1">
            GitHub
          </span>

        </div>

    
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg shadow-violet-600/20 hover:from-violet-500 hover:to-purple-500 hover:shadow-violet-500/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
              Searching
            </>
          ) : (
            <>
              Search
              <span>→</span>
            </>
          )}
        </button>

      </form>

      <p className="text-center text-xs text-gray-500 mt-4">
        Enter a GitHub username to explore their profile and repositories.
      </p>

    </section>
  )
}
