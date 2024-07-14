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

export type SavedTest = TestResult & {
  date: Date
}

export type TestChartData = {
  wpm: number[]
  accuracy: number[]
  errors: string[]
}

export type SavedTestSummary = {
  averageWpm: string
  averageAccuracy: string
  totalKeystrokes: number
  joinDate: Date | string
  testCount: number
}

export type LegendItem = {
  icon?: React.ReactNode
  color?: string
  label: string
}

export type PropertyCollector<T> = {
  [K in keyof T]: T[K][]
}

export type KeyboardKey = { mainKey: string; shiftKey?: string }
