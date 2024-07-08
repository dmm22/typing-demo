import { useRef, useCallback } from "react"

import { Keystroke } from "../../../types"

const useKeystrokes = () => {
  const keystrokeRef = useRef<Keystroke[]>([])

  const recordKeystroke = useCallback((keystroke: Keystroke) => {
    keystrokeRef.current.push(keystroke)
  }, [])

  const resetKeystrokes = useCallback(() => {
    keystrokeRef.current = []
  }, [])

  return { keystrokes: keystrokeRef.current, recordKeystroke, resetKeystrokes }
}

export default useKeystrokes
