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
