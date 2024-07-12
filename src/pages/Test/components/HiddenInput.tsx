import { useRef, KeyboardEvent, useContext } from "react"

import { TestManagerContext } from "../../../context/TestManagerContext"

import useEventListener from "../../../hooks/useEventListener"

import { Keystroke } from "../../../types"

type HiddenInputProps = {
  targetText: string
  hiddenInputValue: string
  missedSpaceInputValue: string
  handleSetHiddenInputValue: (newInput: string) => void
  recordKeystroke: (keystroke: Keystroke) => void
}

export default function HiddenInput({
  targetText,
  hiddenInputValue,
  missedSpaceInputValue,
  handleSetHiddenInputValue,
  recordKeystroke
}: HiddenInputProps) {
  const { testDuration, timer } = useContext(TestManagerContext)

  const inputRef = useRef<HTMLInputElement>(null)

  useEventListener("keydown", focusInput)

  function focusInput() {
    if (document.activeElement?.id === "newTestButton") return
    const inputOutOfFocus = document.activeElement !== inputRef.current

    if (inputOutOfFocus) inputRef.current?.focus()
  }

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const isSingleCharacterKey = e.key.length === 1
    if (!isSingleCharacterKey || !targetText) return

    const target = e.target as HTMLInputElement
    const keyIndex = target.value.length
    const expectedCharacter = targetText[keyIndex]

    const isCorrect = e.key === expectedCharacter
    const result = isCorrect ? "correct" : "incorrect"

    const newKeystroke: Keystroke = {
      key: expectedCharacter,
      result,
      keyIndex,
      timeElapsed: testDuration - timer
    }

    recordKeystroke(newKeystroke)
  }

  return (
    <input
      ref={inputRef}
      className="absolute opacity-0"
      value={missedSpaceInputValue || hiddenInputValue}
      onChange={e => handleSetHiddenInputValue(e.target.value)}
      onKeyDown={handleOnKeyDown}
    />
  )
}
