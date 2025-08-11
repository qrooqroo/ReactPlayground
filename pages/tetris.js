import React, { useState, useEffect } from 'react';
import Board from '@/app/components/Tetris/Board';
import { createBoard, checkCollision } from '@/app/components/Tetris/utils';
import { TETROMINOS } from '@/app/components/Tetris/Tetromino';
import NextTetrominos from '@/app/components/Tetris/NextTetrominos';

const ROWS = 20;
const COLS = 10;

function TetrisPage() {
  const generateTetrominoBag = () => {
    const keys = Object.keys(TETROMINOS);
    const shuffled = [...keys].sort(() => Math.random() - 0.5);
    return shuffled.map(key => TETROMINOS[key]);
  };

  const [tetrominoQueue, setTetrominoQueue] = useState([]);
  const [board, setBoard] = useState(createBoard(ROWS, COLS));
  const [tetromino, setTetromino] = useState(null);
  const [position, setPosition] = useState({ x: 3, y: -2 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [paused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsPaused(!paused);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver && !paused) moveDown();
    }, 500);
    return () => clearInterval(interval);
  }, [position, isGameOver, paused]);

  useEffect(() => {
    setTetrominoQueue(generateTetrominoBag());
  }, []);

  useEffect(() => {
    const initialQueue = generateTetrominoBag();
    const firstTetromino = initialQueue.shift();

    setTetrominoQueue(initialQueue);
    setTetromino(firstTetromino);
  }, []);

  const handleRestart = () => {
    const newBoard = createBoard(ROWS, COLS);
    const newQueue = generateTetrominoBag();
    const firstTetromino = newQueue.shift();

    setBoard(newBoard);
    setTetrominoQueue(newQueue);
    setTetromino(firstTetromino);
    setPosition({ x: 3, y: -2 });
    setIsGameOver(false);
  };

  const clearFullRows = (board) => {
    const newBoard = board.filter(row =>
      !row.every(cell => cell.isFilled)
    );

    const clearedLines = ROWS - newBoard.length;

    const emptyRows = Array.from({ length: clearedLines }, () =>
      Array.from({ length: COLS }, () => ({ isFilled: 0, color: null }))
    );

    const finalBoard = [...emptyRows, ...newBoard];

    // 보드 길이 보장
    while (finalBoard.length < ROWS) {
      finalBoard.unshift(
        Array.from({ length: COLS }, () => ({ isFilled: 0, color: null }))
      );
    }

    if (clearedLines > 0) {
      setScore(prev => prev + clearedLines * 100);
    }

    return finalBoard;
  };

  const isGameOverByFix = (tetromino, position) => {
    for (let y = 0; y < tetromino.shape.length; y++) {
      for (let x = 0; x < tetromino.shape[y].length; x++) {
        if (tetromino.shape[y][x] !== 0) {
          const newY = position.y + y;
          if (newY < 0) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const hardDrop = () => {
    if (paused || isGameOver) return;

    let dropY = position.y;
    const newPos = { ...position };

    while (!checkCollision(board, tetromino, { ...newPos, y: dropY + 1 })) {
      dropY++;
    }

    const finalPosition = { x: position.x, y: dropY };

    // 고정 전에 Game Over 판단
    if (isGameOverByFix(tetromino, finalPosition)) {
      setIsGameOver(true);
      return;
    }

    const fixedBoard = fixTetrominoToBoard(board, tetromino, finalPosition);
    const clearedBoard = clearFullRows(fixedBoard);

    setBoard(clearedBoard);
    spawnNewTetromino(clearedBoard);
  };

  const moveDown = () => {
    if (paused || isGameOver) return;

    const newPos = { x: position.x, y: position.y + 1 };

    if (!checkCollision(board, tetromino, newPos)) {
      setPosition(newPos);
    } else {
      if (isGameOverByFix(tetromino, position)) {
        setIsGameOver(true);
        return;
      }

      const fixedBoard = fixTetrominoToBoard(board, tetromino, position);
      const clearedBoard = clearFullRows(fixedBoard);

      setBoard(clearedBoard);
      spawnNewTetromino(clearedBoard);
    }
  };

  const move = (dir) => {
    const newPos = { x: position.x + dir, y: position.y };
    if (!checkCollision(board, tetromino, newPos, ROWS, COLS)) {
      setPosition(newPos);
    }
  };

  const fixTetrominoToBoard = (board, tetromino, position) => {
    const newBoard = [...board.map(row => [...row])];

    tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = position.y + y;
          const boardX = position.x + x;

          if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
            newBoard[boardY][boardX] = { isFilled: value, color: tetromino.color };
          }
        }
      });
    });

    return newBoard;
  };


  const spawnNewTetromino = (board) => {
    const nextQueue = [...tetrominoQueue];
    const newTetromino = nextQueue.shift();

    const initialY = -newTetromino.shape.length; // 화면 위에서 시작
    const initialPosition = { x: 3, y: initialY };

    if (checkCollision(board, newTetromino, initialPosition)) {
      setIsGameOver(true);
      return;
    }

    setTetromino(newTetromino);
    setPosition(initialPosition);

    if (nextQueue.length < 4) {
      nextQueue.push(...generateTetrominoBag());
    }

    setTetrominoQueue(nextQueue);
  };

  const rotate = (matrix) => {
    return matrix[0].map((_, i) => matrix.map(row => row[i])).reverse();
  };

  const rotateTetromino = () => {
    const rotatedShape = rotate(tetromino.shape);
    const rotatedTetromino = { ...tetromino, shape: rotatedShape };

    if (!checkCollision(board, rotatedTetromino, position, ROWS, COLS)) {
      setTetromino(rotatedTetromino);
    }
  };

  const hasOverflowAfterFix = (board) => {
    for (let y = 0; y < 2; y++) { // 상단 2줄만 검사
      for (let x = 0; x < COLS; x++) {
        if (board[y][x]?.isFilled) {
          return true;
        }
      }
    }
    return false;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsPaused(prev => !prev);
      return;
    }

    if (isGameOver || paused) return;

    if (e.key === 'ArrowLeft') move(-1);
    else if (e.key === 'ArrowRight') move(1);
    else if (e.key === 'ArrowDown') moveDown();
    else if (e.key === 'ArrowUp') rotateTetromino();
    else if (e.code === 'Space') hardDrop(); // Space 키로 하드 드롭
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const drawBoard = () => {
    const newBoard = [...board.map(row => [...row])];

    if (tetromino?.shape) {
      tetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            const boardY = position.y + y;
            const boardX = position.x + x;

            if (
              boardY >= 0 &&
              boardY < ROWS &&
              boardX >= 0 &&
              boardX < COLS &&
              !newBoard[boardY][boardX]?.isFilled // 이미 채워진 칸은 덮지 않음
            ) {
              newBoard[boardY][boardX] = {
                isFilled: value,
                color: tetromino.color,
              };
            }
          }
        });
      });
    }

    return newBoard;
  };

  return (
    <div
      className="App"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111',
      }}
    >
      {isGameOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
          }}
        >
          <h1 style={{ color: 'white', fontSize: '48px', marginBottom: '24px' }}>
            Game Over
          </h1>
          <button
            onClick={handleRestart}
            style={{
              padding: '12px 24px',
              fontSize: '20px',
              fontWeight: 'bold',
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Restart
          </button>
        </div>
      )}
      {paused && !isGameOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 998,
          }}
        >
          <h1 style={{ color: 'white', fontSize: '48px' }}>Paused</h1>
        </div>
      )}

      <div style={{ display: 'flex', gap: '40px' }}>
        <Board board={drawBoard()} />
        <div>
          <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
            Total Score
          </div>
          <div style={{ color: 'white', fontSize: '14px', marginBottom: '20px' }}>
            {score}
          </div>
          <NextTetrominos queue={tetrominoQueue} />
        </div>
      </div>
    </div>
  );
}

export default TetrisPage;