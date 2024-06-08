// Soal Algorithms 4
const matrix = [
  [8, 2, 0],
  [4, 3, 6],
  [2, 8, 4],
];

function diagonalMatrix(matrix) {
  let n = matrix.length;
  let primaryDiagonal = 0;
  let secondaryDiagonal = 0;

  for (let i = 0; i < n; i++) {
    primaryDiagonal += matrix[i][i];
    secondaryDiagonal += matrix[i][n - 1 - i];
  }

  return primaryDiagonal - secondaryDiagonal;
}

console.log(diagonalMatrix(matrix));
