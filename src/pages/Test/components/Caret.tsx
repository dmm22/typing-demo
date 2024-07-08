import { useState, useEffect, useRef, MutableRefObject } from "react"

type CaretProps = {
  caretPositionRef: MutableRefObject<HTMLSpanElement | null>
  hiddenInputValue: string
}

export default function Caret({ caretPositionRef, hiddenInputValue }: CaretProps) {
  const [caretPosition, setCaretPosition] = useState({ x: 0, y: 0 })
  const caretRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<number>()

  useEffect(() => {
    const moveCaretToPosition = () => {
      if (!caretPositionRef.current) return

      const speed = 40
      const dt = 0.01

      const smoothingFactor = 1 - Math.exp(-speed * dt)
      const { offsetLeft: targetX, offsetTop: targetY } = caretPositionRef.current

      if (intervalRef.current) clearInterval(intervalRef.current)

      intervalRef.current = setInterval(() => {
        setCaretPosition(prevPosition => {
          const distanceX = targetX - prevPosition.x
          const distanceY = targetY - prevPosition.y
          const newX = prevPosition.x + distanceX * smoothingFactor
          const newY = prevPosition.y + distanceY * smoothingFactor

          if (Math.abs(distanceX) < 1 && Math.abs(distanceY) < 1) {
            clearInterval(intervalRef.current)
            return { x: targetX, y: targetY }
          }

          return { x: newX, y: newY }
        })
      }, 10)
    }

    moveCaretToPosition()

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [caretPositionRef.current, hiddenInputValue])

  const leftOffset = !hiddenInputValue ? 10 : 8
  const blinkClass = !hiddenInputValue ? "animate-blink" : ""

  return (
    <div
      ref={caretRef}
      id="caret"
      className={`absolute font-mono text-3xl leading-none text-sky-600 ${blinkClass}`}
      style={{
        left: `${caretPosition.x - leftOffset}px`,
        top: `${caretPosition.y - 2}px`,
        transition: "left 0.05s linear, top 0.05s linear"
      }}
    >
      |
    </div>
  )
}
