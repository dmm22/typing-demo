import { useState, useCallback, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import useEventListener from "../hooks/useEventListener"

export default function NewTestButton() {
  const [isVisible, setIsVisible] = useState(false)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    setIsVisible(pathname === "/results")
  }, [pathname])

  useEventListener<KeyboardEvent>("keydown", e => {
    if (isVisible && e.key === "Enter") {
      handleNewTest()
      return
    }

    if (pathname === "/results") return

    if (!isVisible && e.key === "Tab") {
      e.preventDefault()

      setIsVisible(true)
      return
    }

    if (isVisible) setIsVisible(false)
  })

  useEventListener("click", () => {
    const notTestButtonClicked = document.activeElement?.id !== "newTestButton"

    if (pathname !== "/results" && notTestButtonClicked) {
      setIsVisible(false)
    }
  })

  const handleNewTest = useCallback(() => {
    if (pathname === "/") window.location.reload()
    else navigate("/")
  }, [pathname])

  return (
    <>
      {isVisible && (
        <section className="absolute z-20 flex flex-col items-center gap-1 transform -translate-x-1/2 w-max left-1/2 bottom-[20dvh]">
          {pathname === "/results" && (
            <p className="font-medium text-neutral-500">
              Press Tab on any screen to access and use the New Test button.
            </p>
          )}
          <button
            className={`max-w-64 px-3 py-1.5 text-white rounded-lg bg-sky-600 focus:outline-cyan-300 hover:bg-sky-500 transition-all ${
              pathname !== "/results" ? "outline outline-1 outline-cyan-300" : ""
            }`}
            id="newTestButton"
            onClick={handleNewTest}
          >
            <span className="flex items-center gap-2 text-xl font-medium">
              Click or press Enter to start a new test!
            </span>
          </button>
        </section>
      )}
    </>
  )
}
