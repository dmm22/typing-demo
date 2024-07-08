import { useRef } from "react"

import useEventListener from "../../../hooks/useEventListener"

type HiddenInputProps = {
  hiddenInputValue: string
  handleSetHiddenInputValue: (currentInput: string) => void
}

export default function HiddenInput({ hiddenInputValue, handleSetHiddenInputValue }: HiddenInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEventListener("keydown", focusInput)

  function focusInput() {
    const inputOutOfFocus = document.activeElement !== inputRef.current

    if (inputOutOfFocus) inputRef.current?.focus()
  }

  return (
    <input
      ref={inputRef}
      className="absolute opacity-0"
      value={hiddenInputValue}
      onChange={e => handleSetHiddenInputValue(e.target.value)}
    />
  )
}
