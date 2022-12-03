export function sumAll(total: number, current: number): number {
  return total + current;
}

export function maxAll(max: number, current: number): number {
  if (max > current) {
    return max;
  } else {
    return current;
  }
}
