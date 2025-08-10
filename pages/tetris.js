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
  const [tetromino, setTetromino] = useState(TETROMINOS['I'] || { shape: [] });
  const [position, setPosition] = useState({ x: 3, y: 0 });
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver) moveDown();
    }, 500);
    return () => clearInterval(interval);
  }, [position, isGameOver]);

  useEffect(() => {
    setTetrominoQueue(generateTetrominoBag());
  }, []);

  const moveDown = () => {
    const newPos = { x: position.x, y: position.y + 1 };

    if (!checkCollision(board, tetromino, newPos)) {
      setPosition(newPos);
    } else {
      fixTetrominoToBoard(board, tetromino, position);
      spawnNewTetromino(board);
    }
  };

  const move = (dir) => {
    const newPos = { x: position.x + dir, y: position.y };
    if (!checkCollision(board, tetromino, newPos)) {
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
            newBoard[boardY][boardX] = value;
          }
        }
      });
    });
    setBoard(newBoard);
  };

  const spawnNewTetromino = (board) => {
    const nextQueue = [...tetrominoQueue];
    const newTetromino = nextQueue.shift();

    // 새 블록이 충돌하면 게임 오버
    if (checkCollision(board, newTetromino, { x: 3, y: 0 })) {
      // ✅ 마지막 블록을 고정
      fixTetrominoToBoard(board, tetromino, position);

      // ✅ 게임 오버 상태만 설정
      setIsGameOver(true);
      return;
    }

    setTetromino(newTetromino);
    setPosition({ x: 3, y: 0 });

    if (nextQueue.length < 3) {
      const newBag = generateTetrominoBag();
      nextQueue.push(...newBag);
    }

    setTetrominoQueue(nextQueue);
  };

  const rotate = (matrix) => {
    return matrix[0].map((_, i) => matrix.map(row => row[i])).reverse();
  };

  const rotateTetromino = () => {
    const rotatedShape = rotate(tetromino.shape);
    const rotatedTetromino = { ...tetromino, shape: rotatedShape };

    if (!checkCollision(board, rotatedTetromino, position)) {
      setTetromino(rotatedTetromino);
    }
  };

  const handleKeyDown = (e) => {
    if (isGameOver) return;

    if (e.key === 'ArrowLeft') move(-1);
    else if (e.key === 'ArrowRight') move(1);
    else if (e.key === 'ArrowDown') moveDown();
    else if (e.key === 'ArrowUp') rotateTetromino();
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
            if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
              newBoard[boardY][boardX] = value;
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
            top: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '12px 24px',
            fontSize: '28px',
            fontWeight: 'bold',
            borderRadius: '6px',
            zIndex: 10,
          }}
        >
          Game Over
        </div>
      )}

      <div style={{ display: 'flex', gap: '40px' }}>
        <div>
          <h1 style={{ color: 'white' }}>React Tetris</h1>
          <Board board={drawBoard()} />
        </div>
        <NextTetrominos queue={tetrominoQueue} />
      </div>
    </div>
  );
}

export default TetrisPage;