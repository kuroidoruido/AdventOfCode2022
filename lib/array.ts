export function sortDesc<T>(sorter: (a: T, b: T) => number) {
    return (a:T,b: T) => - sorter(a, b);
}

export function numberSort(a: number, b: number): number {
    return a - b;
}