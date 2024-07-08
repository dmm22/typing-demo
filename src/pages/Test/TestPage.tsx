import { useCallback, useContext } from "react"

import HiddenInput from "./components/HiddenInput"
import TestTimer from "./components/TestTimer"
import TextDisplay from "./components/TextDisplay"
import TestDurationPicker from "./components/TestDurationPicker"
import TextTypePicker from "./components/TextTypePicker"

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
    <>
      <HiddenInput
        targetText={targetText}
        hiddenInputValue={hiddenInputValue}
        handleSetHiddenInputValue={handleSetHiddenInputValue}
        recordKeystroke={recordKeystroke}
      />
      <main className="absolute inset-0 flex items-center justify-center">
        <div className="grid items-center grid-rows-3">
          <section className="flex justify-center">
            {timerStage === "running" && <TestTimer />}
            {timerStage === "stopped" && (
              <menu className="flex gap-14 ">
                <TestDurationPicker />
                <TextTypePicker updateTextArray={updateTextArray} />
              </menu>
            )}
          </section>
          <section className="my-14">
            <TextDisplay
              targetText={targetText}
              hiddenInputValue={hiddenInputValue}
              missedSpaceIndex={missedSpaceIndex}
            />
          </section>
        </div>
      </main>
    </>
  )
}
