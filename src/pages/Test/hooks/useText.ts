import { shuffleArray } from "../../../utils/arrayUtils"
import sentences from "../../../data/sentences.json"
import { useCallback, useMemo, useState } from "react"

const useText = (initialTextArray?: string[]) => {
  const [textArray, setTextArray] = useState(() => shuffleArray(initialTextArray || sentences))
  const [targetTextIndex, setTargetTextIndex] = useState(0)

  const updateTextArray = useCallback((newArray: string[]) => {
    setTextArray(shuffleArray(newArray))
    setTargetTextIndex(0)
  }, [])

  const updateTargetText = useCallback(() => {
    setTargetTextIndex(prevIndex => prevIndex + 1)
  }, [])

  const targetText = useMemo(() => textArray[targetTextIndex], [targetTextIndex, textArray])

  return { targetText, updateTargetText, updateTextArray }
}

export default useText
