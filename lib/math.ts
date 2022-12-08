export function sumAll(total: number, current: number): number {
  return total + current;
}

export function multiplyAll(total: number, current: number): number {
  return total * current;
}

export function minAll(min: number, current: number): number {
  if (min < current) {
    return min;
  } else {
    return current;
  }
}

export function maxAll(max: number, current: number): number {
  if (max > current) {
    return max;
  } else {
    return current;
  }
}
