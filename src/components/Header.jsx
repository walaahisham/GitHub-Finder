export default function Header({ darkMode, toggleTheme }) {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-5 mb-12 animate-fade-up">

      {/* Logo */}
      <div className="flex items-center gap-4">

        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg shadow-violet-500/30 text-white text-3xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
          </svg>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight gradient-text">
            GitHub Finder
          </h1>

          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Explore developers & discover projects
          </p>
        </div>

      </div>

      {/* Theme Button */}
      <button
        onClick={toggleTheme}
        className="group flex items-center gap-3 px-5 py-3 rounded-2xl border border-violet-500/20 bg-white dark:bg-[#151326] text-gray-700 dark:text-gray-200 shadow-lg shadow-violet-500/5 hover:border-violet-500/60 hover:shadow-violet-500/20 hover:-translate-y-1 transition-all duration-300"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform">
          {darkMode ? "☀️" : "🌙"}
        </span>

        <span className="text-sm font-semibold">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </span>
      </button>

    </header>
  )
}