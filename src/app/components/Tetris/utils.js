export const createBoard = (rows, cols) => {
  return Array.from({ length: rows }, () =>
    Array(cols).fill({isFilled: 0, color: null })
  );
};

export const hasOverflowAfterFix = (board) => {
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < board[0].length; x++) {
      if (board[y][x] !== 0) {
        return true;
      }
    }
  }
  return false;
};

export const checkCollision = (board, tetromino, position, rows = 20, cols = 10) => {
  for (let y = 0; y < tetromino?.shape?.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x] !== 0) {
        const newY = position.y + y;
        const newX = position.x + x;

        // 보드 범위를 벗어난 경우
        if (newX < 0 || newX >= cols || newY >= rows) {
          return true;
        }

        // 음수 y는 아직 보드에 진입 전이므로 충돌로 간주하지 않음
        if (newY >= 0 && board[newY][newX]?.isFilled) {
          return true;
        }
      }
    }
  }
  return false;
};