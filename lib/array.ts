import { isDefined } from "./fp.ts";

export function sortDesc<T>(sorter: (a: T, b: T) => number) {
  return (a: T, b: T) => -sorter(a, b);
}

export function numberSort(a: number, b: number): number {
  return a - b;
}

export function chunk<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  const pending = [...array];
  while (pending.length > chunkSize) {
    chunks.push(pending.splice(0, chunkSize));
  }
  if (pending.length > 0) {
    chunks.push(pending);
  }
  return chunks;
}

export function uniq<T>(uniqItems: T[], current: T): T[] {
  if (uniqItems.includes(current)) {
    return uniqItems;
  } else {
    return [...uniqItems, current];
  }
}

export function findCommonItems<T>(one: T[], two: T[]): T[] {
  return one.filter((item) => two.includes(item));
}

export function takeWhile<T>(
  condition: (acc: T[], current: T) => boolean
): (acc: T[], current: T) => T[] {
  let continueToTake = true;
  return (acc: T[], current: T) => {
    if (continueToTake && condition(acc, current)) {
      return [...acc, current];
    } else {
      continueToTake = false;
      return acc;
    }
  };
}

export function takeUntil<T>(
  condition: (acc: T[], current: T) => boolean
): (acc: T[], current: T) => T[] {
  let continueToTake = true;
  return (acc: T[], current: T) => {
    if (!continueToTake) {
      return acc;
    }
    if (condition(acc, current)) {
      continueToTake = false;
    }
    return [...acc, current];
  };
}

export function newArray<T = null>(length: number, fill?: () => T): T[] {
  const array = new Array(length).fill(null);
  if (isDefined(fill)) {
    return array.map(fill);
  } else {
    return array;
  }
}
