/**
 * It takes an array, removes an item from it, and then inserts it back into the array at a different
 * index.
 */
export function reorderArray<T>(list: T[], startIndex: number, endIndex: number): T[] {
  if (endIndex === undefined) return list;
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
