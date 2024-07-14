import { useCallback, useContext, useEffect, useMemo } from "react"

import HiddenInput from "./components/HiddenInput"
import TestTimer from "./components/TestTimer"
import TextDisplay from "./components/TextDisplay"
import TestDurationPicker from "./components/TestDurationPicker"
import TextTypePicker from "./components/TextTypePicker"

import { TestManagerContext } from "../../context/TestManagerContext"

import useHiddenInput from "./hooks/useHiddenInput"
import useText from "./hooks/useText"
import useKeystrokes from "./hooks/useKeystrokes"
import InteractiveKeyboardMockup from "./components/InteractiveKeyboardMockup"

export default function TestPage() {
  const { targetText, updateTargetText, updateTextArray } = useText()
  const { hiddenInputValue, missedSpaceInputValue, setHiddenInputValue } = useHiddenInput()
  const { keystrokes, recordKeystroke, resetKeystrokes } = useKeystrokes()

  const { timerStage, startTimer, finalizeTest } = useContext(TestManagerContext)

  useEffect(() => {
    if (timerStage === "complete") {
      resetKeystrokes()
      setHiddenInputValue("")
      updateTargetText()
      finalizeTest(keystrokes)
    }
  }, [timerStage])

  const handleSetHiddenInputValue = (newInput: string) => {
    if (keystrokes.length === 1 && timerStage === "stopped") startTimer()

    const isEndOfText = hiddenInputValue.length === targetText?.length
    if (isEndOfText) {
      handleEndOfText()
      return
    }

    setHiddenInputValue(newInput, targetText)
  }

  const handleEndOfText = useCallback(() => {
    setHiddenInputValue("")
    updateTargetText()
  }, [targetText])

  const currentTargetText = useMemo(() => {
    if (!missedSpaceInputValue) return targetText

    const missedSpaceIndex = hiddenInputValue.length

    const leadingText = targetText.slice(0, hiddenInputValue.length)
    const trailingText = targetText.slice(missedSpaceIndex)

    return leadingText + missedSpaceInputValue + trailingText
  }, [targetText, hiddenInputValue, missedSpaceInputValue])

  return (
    <>
      <HiddenInput
        targetText={targetText}
        hiddenInputValue={hiddenInputValue}
        missedSpaceInputValue={missedSpaceInputValue}
        handleSetHiddenInputValue={handleSetHiddenInputValue}
        recordKeystroke={recordKeystroke}
      />
      <main className="absolute inset-0 flex items-center justify-center">
        <div className="grid items-center grid-rows-3">
          <section className="flex items-end justify-center h-full">
            {timerStage === "running" && <TestTimer />}
            {timerStage === "stopped" && (
              <menu className="flex gap-14">
                <TestDurationPicker />
                <TextTypePicker updateTextArray={updateTextArray} />
              </menu>
            )}
          </section>
          <section className="flex items-center">
            <TextDisplay
              targetText={currentTargetText}
              hiddenInputValue={hiddenInputValue}
              missedSpaceInputValue={missedSpaceInputValue}
            />
          </section>
          <section className="flex justify-center">
            <InteractiveKeyboardMockup />
          </section>
        </div>
      </main>
    </>
  )
}
