import { useState, useEffect } from "react"

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <button
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      }}
      aria-label="Scroll to top"
      title="Back to top"
      className={`
        fixed bottom-7 right-7 z-[9999]
        w-13 h-13
        flex items-center justify-center
        rounded-2xl
        bg-gradient-to-br from-violet-500 to-purple-700
        text-white text-2xl font-bold
        border border-violet-400/30
        shadow-xl shadow-violet-600/30
        hover:shadow-violet-500/50
        hover:-translate-y-2 hover:scale-110
        active:scale-95
        transition-all duration-300
        ${
          visible
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-75 pointer-events-none"
        }
      `}
    >
      ↑
    </button>
  )
}