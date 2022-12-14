interface PrintMatrixOpt {
  withRowIndex?: boolean;
}

export function printMatrix<T>(
  m: T[][],
  { withRowIndex = false }: PrintMatrixOpt = {}
) {
  let rows = m.map((row) => row.map((item) => String(item)).join(""));
  if (withRowIndex) {
    rows = rows.map((r, index) => `${("   " + index).slice(-3)}   ${r}`);
  }

  console.log(rows.join("\n"));
}
