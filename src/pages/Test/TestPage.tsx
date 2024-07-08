import useHiddenInput from "./hooks/useHiddenInput"
import useText from "./hooks/useText"

export default function TestPage() {
  const { targetText, updateTargetText, updateTextArray } = useText()
  const { hiddenInputValue, missedSpaceIndex, setHiddenInputValue } = useHiddenInput()

  const handleSetHiddenInputValue = (currentInput: string) => {
    setHiddenInputValue(currentInput, targetText)
  }

  return (
    <main>
      <input value={hiddenInputValue} onChange={e => handleSetHiddenInputValue(e.target.value)} />
      <p>{targetText}</p>
    </main>
  )
}
