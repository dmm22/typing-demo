export const calculateWpm = (secondsElapsed: number, totalCorrectKeystrokes: number) => {
  const minutes = secondsElapsed / 60
  const words = totalCorrectKeystrokes / 5
  return minutes > 0 ? Math.round(words / minutes) : 0
}

export const calculateAccuracy = (totalCorrectKeystrokes: number, totalKeystrokes: number) => {
  return totalKeystrokes === 0 ? 0 : +((totalCorrectKeystrokes / totalKeystrokes) * 100).toFixed(1)
}
