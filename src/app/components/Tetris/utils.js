export const createBoard = (rows, cols) => {
  return Array.from({ length: rows }, () =>
    Array(cols).fill(0)
  );
};

export const checkCollision = (board, tetromino, position) => {
  if (!Array.isArray(board) || board.length === 0) {
    return false;
  }
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x] !== 0) {
        const newY = position.y + y;
        const newX = position.x + x;
        if (
          newY >= board.length ||
          newX < 0 ||
          newX >= board[0].length ||
          (newY >= 0 && board[newY][newX] !== 0)
        ) {
          return true;
        }
      }
    }
  }
  return false;
};