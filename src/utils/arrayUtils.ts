export const shuffleArray = <T>(array: T[]) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export const extractProperties = <T extends {}>(objectArray: T[], properties: (keyof T)[]) => {
  return objectArray.reduce((acc, obj) => {
    properties.forEach(key => {
      if (!acc[key]) acc[key] = []

      acc[key].push(obj[key])
    })

    return acc
  }, {} as PropertyCollector<T>)
}
