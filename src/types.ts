export type TimerStage = "stopped" | "running" | "complete"

export type Keystroke = {
  key: string
  result: "correct" | "incorrect"
  keyIndex: number
  timeElapsed: number
}

export type CarouselOption = {
  value: string | number
  label: string
}

export type TestResult = {
  testDuration: number
  totalKeystrokes: number
  correctKeystrokes: number
  wpm: number
  accuracy: number
}

export type TestChartData = {
  wpm: number[]
  accuracy: number[]
  errors: string[]
}
