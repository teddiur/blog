import { describe, it, expect } from 'vitest';
import { swapLast } from '~/features/ocr/logic';

describe('swapLast', () => {
  it('should replace the last element of an array with a new item', () => {
    const array = [1, 2, 3];
    const newItem = 4;
    const result = swapLast(array, newItem);
    expect(result).toEqual([1, 2, 4]);
  });

  it('should return a new array with only the newItem if the input array is empty', () => {
    const array: number[] = [];
    const newItem = 1;
    const result = swapLast(array, newItem);
    expect(result).toEqual([1]);
  });

  it('should return a new array with only the newItem if the input array has one element', () => {
    const array = [1];
    const newItem = 2;
    const result = swapLast(array, newItem);
    expect(result).toEqual([2]);
  });
});
