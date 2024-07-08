import { useCallback, useContext } from "react"

import HiddenInput from "./components/HiddenInput"
import TestTimer from "./components/TestTimer"
import TextDisplay from "./components/TextDisplay"
import TestDurationPicker from "./components/TestDurationPicker"

import { TestManagerContext } from "../../context/TestManagerContext"

import useHiddenInput from "./hooks/useHiddenInput"
import useText from "./hooks/useText"
import useKeystrokes from "./hooks/useKeystrokes"

export default function TestPage() {
  const { targetText, updateTargetText, updateTextArray } = useText()
  const { hiddenInputValue, missedSpaceIndex, setHiddenInputValue } = useHiddenInput()
  const { keystrokes, recordKeystroke, resetKeystrokes } = useKeystrokes()

  const { timerStage, startTimer } = useContext(TestManagerContext)

  const handleSetHiddenInputValue = (currentInput: string) => {
    if (keystrokes.length === 1 && timerStage === "stopped") startTimer()

    const isEndOfText = hiddenInputValue.length === targetText?.length
    if (isEndOfText) {
      handleEndOfText()
      return
    }

    setHiddenInputValue(currentInput, targetText)
  }

  const handleEndOfText = useCallback(() => {
    setHiddenInputValue("")
    updateTargetText()
  }, [targetText])

  return (
    <main>
      <HiddenInput
        targetText={targetText}
        hiddenInputValue={hiddenInputValue}
        handleSetHiddenInputValue={handleSetHiddenInputValue}
        recordKeystroke={recordKeystroke}
      />
      <TestDurationPicker />
      <TestTimer />
      <TextDisplay
        targetText={targetText}
        hiddenInputValue={hiddenInputValue}
        missedSpaceIndex={missedSpaceIndex}
      />
    </main>
  )
}
