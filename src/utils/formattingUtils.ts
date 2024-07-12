export const formatSecondsAsMMSS = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

export const formatSecondsAsFullWords = (duration: number) => {
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60

  const minuteString = minutes === 1 ? "1 Minute" : minutes > 1 ? `${minutes} Minutes` : ""
  const secondString = seconds === 1 ? "1 Second" : seconds > 1 ? `${seconds} Seconds` : ""

  return `${minuteString}${minuteString && secondString ? " " : ""}${secondString}`.trim()
}

export const formatLongDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}
