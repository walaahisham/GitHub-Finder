export default function Welcome({ onSelect }) {
  return (
    <section className="relative mt-20 mb-16 text-center animate-fade-up">

      
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="relative">

      
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-300 text-xs font-semibold mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Discover the Developer Community
        </div>

        
        <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-2xl shadow-violet-600/30 animate-float">

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="55"
            height="55"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
          </svg>

        </div>

      
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">

          Explore the World of

          <span className="block mt-3 gradient-text">
            GitHub Developers
          </span>

        </h2>
        <p className="max-w-2xl mx-auto mt-7 text-base md:text-lg text-gray-500 dark:text-gray-400 leading-8">

          Discover talented developers, explore amazing repositories,
          and find inspiration from millions of projects around the world.

        </p>

  
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">

          <button
            onClick={() => onSelect("torvalds")}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold shadow-xl shadow-violet-600/25 hover:shadow-violet-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-300"
          >
            Explore Developers
            <span className="text-xl">→</span>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-gray-300 dark:border-violet-500/30 bg-white/70 dark:bg-[#151326] text-gray-700 dark:text-gray-200 font-semibold hover:border-violet-500 hover:text-violet-500 dark:hover:text-violet-300 hover:-translate-y-1 transition-all duration-300"
          >
            Visit GitHub
            <span>↗</span>
          </a>

        </div>

    
        <div className="flex flex-wrap justify-center gap-3 mt-12">

          {[
            "🔍 User Search",
            "📁 Repositories",
            "⭐ GitHub Stats",
            "🚀 Developer Discovery"
          ].map((item) => (

            <div
              key={item}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#151326] border border-gray-200 dark:border-violet-500/15 text-xs md:text-sm text-gray-600 dark:text-gray-400 shadow-sm hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              {item}
            </div>

          ))}

        </div>

      </div>

    </section>
  )
}
