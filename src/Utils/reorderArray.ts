export function reorderArray<T> (list: T[], startIndex: number, endIndex: number | undefined): T[] {
  if (endIndex === undefined) return list
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}
