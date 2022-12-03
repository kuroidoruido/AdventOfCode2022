export function isDefined<T>(x: T | undefined | null): x is T {
  return typeof x !== undefined && x !== null;
}

export function isNotDefined<T>(
  x: T | undefined | null,
): x is undefined | null {
  return !isDefined(x);
}

export function isNotEmpty<T extends { length: number }>(
  x: T | { length: 0 },
): x is T {
  return x.length > 0;
}

export function isDefinedAndNotEmpty<T extends { length: number }>(
  x: T | { length: 0 } | undefined | null,
): x is T {
  return isDefined(x) && isNotEmpty(x);
}
