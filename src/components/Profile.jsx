export default function Profile({ user }) {
  const stats = [
    { label: "Repositories", value: user.public_repos, icon: "📁" },
    { label: "Followers", value: user.followers, icon: "👥" },
    { label: "Following", value: user.following, icon: "🔗" },
    { label: "Gists", value: user.public_gists, icon: "📝" }
  ]

  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : "Unknown date"

  return (
    <section className="mt-12 animate-fade-up">

      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#111426] border border-gray-200 dark:border-violet-500/20 shadow-2xl shadow-violet-950/10">
        <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 opacity-95"></div>
        <div className="absolute -top-20 -right-16 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="relative px-6 md:px-10 pt-14 pb-8">

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="shrink-0">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-32 h-32 md:w-36 md:h-36 rounded-3xl border-4 border-white dark:border-[#111426] object-cover shadow-xl"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0 md:mt-16">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {user.name || user.login}
                </h2>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300">
                  Developer
                </span>
              </div>

              <p className="text-violet-600 dark:text-violet-400 mt-1 font-medium">
                @{user.login}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed max-w-2xl">
                {user.bio || "This user hasn't added a bio yet."}
              </p>

            </div>

            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 md:mt-16 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg shadow-violet-600/20 hover:shadow-violet-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              <span>Visit GitHub</span>
              <span>↗</span>
            </a>

          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8 text-sm text-gray-500 dark:text-gray-400">

            {user.location && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{user.location}</span>
              </div>
            )}

            {user.company && (
              <div className="flex items-center gap-2">
                <span>🏢</span>
                <span>{user.company}</span>
              </div>
            )}

            {user.blog && (
              <a
                href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-violet-500 transition"
              >
                <span>🌐</span>
                <span className="break-all">{user.blog}</span>
              </a>
            )}

            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>Joined {joinedDate}</span>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700/70 my-8"></div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group p-5 rounded-2xl bg-gray-50 dark:bg-[#191b31] border border-gray-200 dark:border-violet-500/10 hover:border-violet-500/40 hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <span className="text-xl group-hover:scale-110 transition">
                    {stat.icon}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-3">
                  {stat.value.toLocaleString()}
                </h3>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  )
}
