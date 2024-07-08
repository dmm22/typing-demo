import useText from "./hooks/useText"

export default function TestPage() {
  const { targetText, updateTargetText, updateTextArray } = useText()

  return (
    <main>
      <p>{targetText}</p>
    </main>
  )
}
