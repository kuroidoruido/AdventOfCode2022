export function sumAll(initial = 0): [(total: number, cur: number) => number, number] {
    return [(total: number, cur: number) => total + cur, initial]
}