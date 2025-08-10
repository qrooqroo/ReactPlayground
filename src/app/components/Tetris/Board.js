import React from 'react';

const Board = ({ board }) => {
  return (
    <div className="board">
      {board.map((row, y) => (
        <div key={y} className="row">
          {row.map((cell, x) => (
            <div
              key={x}
              className={`cell ${cell !== 0 ? 'filled' : ''}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;