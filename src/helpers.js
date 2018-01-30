const getRandomInt = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

const getRandomMatrix = (dimension) => {
  const matrix = [];
  for (let i = 0; i < dimension; i++) {
    matrix[i] = [];
    for (let j = 0; j < dimension; j++) {
      matrix[i][j] = getRandomInt();
    }
  }

  return matrix;
};

const getEMatrix = (dimension) => {
  const matrix = [];

  for (let row = 0; row < dimension; row++) {
    matrix[row] = [];
    for (let col = 0; col < dimension; col++) {
      matrix[row][col] = row === col ? 1 : 0;
    }
  }

  return matrix;
}

const binaryPlus = (a, b) => (a === 1 && b === 1) ? 1 : (a + b);

const multiplyMatrixes = (m1, m2) => {
  const rowsA = m1.length;
  const rowsB = m2.length;
  const colsA = m1[0].length;
  const colsB = m2[0].length;

  if(colsA !== rowsB) {
    return false;
  }

  const m3 = [];
  for (let row = 0; row < rowsA; row++) {
    m3[row] = [];
  }

  for (let col = 0; col < colsB; col++) {
    for (let row = 0; row < rowsA; row++) {
      let t = 0;
      for (let j = 0; j < rowsB; j++) {
        t = binaryPlus(t, m1[row][j] * m2[j][col]);
      }
      m3[row][col] = t;
    }
  }

  return m3;
}

const isInclude = (m1, m2) => {
  let result = true;

  m1.forEach((row, i) =>
    row.forEach((col, j) => {
      if(m1[i][j] === 1 && m2[i][j] !== 1) {
        result = false;
      }
    }
  ));

  return result;
}

const reverseMatrix = matrix => {
  const reversed = [];
  matrix.forEach((el, i) => reversed[i] = []);

  for (let row = 0; row < matrix.length; row++){
    for (let col = 0; col < matrix[row].length; col++) {
      reversed[col][row] = matrix[row][col];
    }
  }

  return reversed;
}

const unite = (m1, m2) => {
  const united = m1.map(row => row.map(col => 0));

  for (let row = 0; row < m1.length; row++){
    for (let col = 0; col < m1[row].length; col++) {
      if(m1[row][col] || m2[row][col]) {
        united[row][col] = 1;
      }
    }
  }

  return united;
}

let id = 0;
const uid = () => id++;

const withKeys = data => data.map(row => ({
                            id: `row-${uid()}`,
                            values: row.map(c => ({
                              id: `col-${uid()}`,
                              value: c
                            }))
                          }));

module.exports = {
  getRandomInt,
  getRandomMatrix,
  getEMatrix,
  multiplyMatrixes,
  isInclude,
  reverseMatrix,
  unite,
  uid,
  withKeys
 };
