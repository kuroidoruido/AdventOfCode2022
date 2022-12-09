export class MySet<T> {
  private values: T[] = [];

  constructor(private readonly comparator: (a: T, b: T) => number) {}

  push(newValue: T) {
    if (this.values.every((v) => this.comparator(v, newValue) !== 0)) {
      this.values.push(newValue);
    }
  }

  asArray(): T[] {
    return [...this.values];
  }
}
