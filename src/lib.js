import {
  isInclude,
  multiplyMatrixes,
  unite,
  reverseMatrix,
  getEMatrix
} from './helpers';

const isReflexive = matrix => {
  for(let row = 0; row < matrix.length; row++) {
    for(let col = 0; col < matrix[row].length; col++) {
      if(row === col && matrix[row][col] !== 1) {
        return false;
      }
    }
  }

  return true;
}

const isTransitive = matrix =>
  isInclude(multiplyMatrixes(matrix, matrix), matrix);

const isAntiSymmetric = matrix =>
  unite(matrix, reverseMatrix(matrix)) === getEMatrix();

const isLinked = matrix => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = row; col < matrix[row].length; col++) {
      if(row !== col && !matrix[row][col] && !matrix[col][row]) {
        return false;
      }
    }
  }

  return true;
}


export {
  isReflexive,
  isTransitive,
  isAntiSymmetric,
  isLinked
};
