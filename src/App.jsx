import { useState, useEffect, useRef } from "react"

import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import Profile from "./components/Profile"
import Repositories from "./components/Repositories"
import Welcome from "./components/Welcome"
import ScrollToTop from "./components/ScrollToTop"

const API = "https://api.github.com/users"
const PER_PAGE = 6

function readTheme() {
  try {
    return localStorage.getItem("theme") !== "light"
  } catch {
    return true
  }
}

function readHistory() {
  try {
    const saved = JSON.parse(localStorage.getItem("searchHistory") || "[]")
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    
  }
}

export default function App() {
  const [username, setUsername] = useState("")
  const [search, setSearch] = useState("")
  const [searchId, setSearchId] = useState(0) 

  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState([])

  const [darkMode, setDarkMode] = useState(readTheme)
  const [history, setHistory] = useState(readHistory)

  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const loadMoreController = useRef(null)

  
  useEffect(() => {
    save("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  useEffect(() => {
    save("searchHistory", JSON.stringify(history))
  }, [history])

  // Fetch User + first page of repos
  useEffect(() => {
    if (!search) return

    const controller = new AbortController()
    const { signal } = controller
    const base = `${API}/${encodeURIComponent(search)}`

    async function fetchUser() {
      setLoading(true)
      setLoadingMore(false)
      setError("")
      setUser(null)
      setRepos([])
      setPage(1)
      setHasMore(false)

      try {
      
        const [response, reposResponse] = await Promise.all([
          fetch(base, { signal }),
          fetch(`${base}/repos?sort=updated&per_page=${PER_PAGE}&page=1`, { signal }),
        ])

        if (response.status === 404) throw new Error("User not found!")
        if (response.status === 403 || reposResponse.status === 403)
          throw new Error("Too many requests. Try again later.")
        if (!response.ok) throw new Error("Something went wrong!")
        if (!reposResponse.ok) throw new Error("Could not load repositories")

        const data = await response.json()
        const reposData = await reposResponse.json()

        setUser(data)
        setRepos(reposData)
        setHasMore(reposData.length === PER_PAGE)

        setHistory((prev) =>
          [
            search,
            ...prev.filter((name) => name.toLowerCase() !== search.toLowerCase()),
          ].slice(0, 5)
        )
      } catch (err) {
        if (err.name === "AbortError") return
        setError(
          err instanceof TypeError
            ? "Network error. Check your internet connection."
            : err.message
        )
      } finally {
        if (!signal.aborted) setLoading(false)
      }
    }

    fetchUser()

    return () => {
      controller.abort()
      loadMoreController.current?.abort()
    }
  }, [search, searchId])

  
  async function loadMore() {
    if (loadingMore || !hasMore || !search) return

    const controller = new AbortController()
    loadMoreController.current = controller

    setLoadingMore(true)
    setError("")

    try {
      const nextPage = page + 1

      const response = await fetch(
        `${API}/${encodeURIComponent(search)}/repos?sort=updated&per_page=${PER_PAGE}&page=${nextPage}`,
        { signal: controller.signal }
      )

      if (!response.ok) throw new Error("Could not load more repositories")

      const data = await response.json()

      setRepos((prev) => [...prev, ...data])
      setPage(nextPage)
      setHasMore(data.length === PER_PAGE)
    } catch (err) {
      if (err.name === "AbortError") return
      setError(
        err instanceof TypeError ? "Network error. Check your internet connection." : err.message
      )
    } finally {
      if (!controller.signal.aborted) setLoadingMore(false)
    }
  }

  
  function searchUser(e) {
    e.preventDefault()

    const value = username.trim()

    if (!value) {
      setError("Please enter a GitHub username")
      setSearch("")
      setUser(null)
      setRepos([])
      setHasMore(false)
      return
    }

    setError("")

    if (value.toLowerCase() === search.toLowerCase()) {
      setSearchId((n) => n + 1) 
    } else {
      setSearch(value)
    }
  }


  function selectUser(name) {
    setUsername(name)
    setError("")

    if (name.toLowerCase() === search.toLowerCase()) {
      setSearchId((n) => n + 1)
    } else {
      setSearch(name)
    }
  }

  
  function clearHistory() {
    setHistory([])
  }

  function toggleTheme() {
    setDarkMode((prev) => !prev)
  }

  return (
    <div className={darkMode ? "dark" : "light"}>
      <main className="relative min-h-screen overflow-hidden bg-gray-50 dark:bg-[#080b16] text-gray-900 dark:text-white transition-colors duration-300">
        <div className="fixed top-0 left-0 w-96 h-96 bg-violet-400/30 dark:bg-violet-600/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="fixed top-1/3 right-0 w-96 h-96 bg-purple-300/30 dark:bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="fixed bottom-0 left-1/3 w-80 h-80 bg-sky-300/30 dark:bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">

          <Header darkMode={darkMode} toggleTheme={toggleTheme} />

          <SearchBar
            username={username}
            setUsername={setUsername}
            searchUser={searchUser}
            loading={loading}
          />

          
          {history.length > 0 && (
            <section className="mt-8 p-5 rounded-2xl bg-white/80 dark:bg-[#111426]/80 backdrop-blur-xl border border-gray-200 dark:border-violet-500/15 shadow-lg shadow-black/5">

              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🕘</span>
                  <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200">
                    Recent Searches
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={clearHistory}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 transition"
                >
                  Clear History
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {history.map((name) => (
                  <button
                    type="button"
                    key={name}
                    onClick={() => selectUser(name)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-[#191b31] border border-gray-200 dark:border-violet-500/15 text-sm text-violet-600 dark:text-violet-300 hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span>👤</span>
                    {name}
                  </button>
                ))}
              </div>
            </section>
          )}
          
        
          <div className="flex items-center justify-center flex-wrap gap-3 mt-7 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Try searching:</span>

            {["torvalds", "gaearon", "sindresorhus"].map((name) => (
              <button
                type="button"
                key={name}
                onClick={() => selectUser(name)}
                className="px-3 py-1.5 rounded-lg bg-violet-100/70 dark:bg-violet-500/10 text-violet-600 dark:text-violet-300 border border-violet-200 dark:border-violet-500/15 font-medium hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 transition-all duration-300"
              >
                {name}
              </button>
            ))}
          </div>

        
          {!user && !loading && !error && <Welcome onSelect={selectUser} />}

          
          {loading && (
            <div className="flex flex-col items-center justify-center mt-20 mb-20 gap-5">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-violet-200 dark:border-violet-500/10"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-600 border-r-purple-500 animate-spin"></div>
                <div className="absolute inset-3 rounded-full bg-violet-500/10"></div>
              </div>

              <div className="text-center">
                <p className="text-violet-600 dark:text-violet-400 font-bold">
                  Searching GitHub...
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Finding developer profile and repositories
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mt-10 max-w-xl mx-auto p-8 rounded-3xl bg-white dark:bg-[#111426] border border-red-200 dark:border-red-500/20 shadow-xl shadow-red-500/5 text-center animate-fade-up"
            >
              <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-red-100 dark:bg-red-500/10 text-3xl">
                ⚠️
              </div>

              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                Oops! Something went wrong
              </h3>

              <p className="text-sm text-red-500 dark:text-red-400 mt-3">{error}</p>

              <button
                type="button"
                onClick={() => {
                  setError("")
                  if (search) setSearchId((n) => n + 1)
                }}
                className="mt-6 px-7 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg shadow-violet-600/20 hover:shadow-violet-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                Try Again →
              </button>
            </div>
          )}

          {user && <Profile user={user} />}

          {user && (
            <Repositories
              repos={repos}
              loadMore={loadMore}
              loadingMore={loadingMore}
              hasMore={hasMore}
            />
          )}

          {/* Footer */}
          <footer className="mt-24 pt-8 border-t border-gray-200 dark:border-violet-500/10 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Built with <span className="text-red-500">♥</span> using React and GitHub API
            </p>
            <p className="text-xs text-gray-400 mt-2">GitHub Finder © 2026</p>
          </footer>

        </div>
      </main>

      <ScrollToTop />
    </div>
  )
}
