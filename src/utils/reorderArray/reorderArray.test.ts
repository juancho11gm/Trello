import { describe, expect } from 'vitest';
import { reorderArray } from './reorderArray';

describe('reorderArray', () => {
  test('reorder string array', () => {
    const array = ['A', 'B', 'C', 'D'];
    const result = reorderArray(array, 1, 3);
    expect(result).toEqual(['A', 'C', 'D', 'B'])
  });

  test('reorder numbers array', () => {
    const array = [1, 2, 3, 4];
    const result = reorderArray(array, 3, 0);
    expect(result).toEqual([4, 1, 2, 3]);
  });

  test('reorder using the same position', () => {
    const array = [1, 2, 3, 4];
    const result = reorderArray(array, 3, 3);
    expect(result).toEqual([1, 2, 3, 4]);
  });
});