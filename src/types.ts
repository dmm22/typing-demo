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
