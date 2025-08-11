import React from 'react';

const Board = ({ board }) => {
  return (
    <div className="board">
      {board.map((row, y) => (
        <div key={y} className="row">
          {row.map((cell, x) => (
            <div
              key={x}
              className={`cell ${cell.isFilled ? 'filled' : ''}`}
              style={{
                backgroundColor: cell.color ? cell.color : 'transparent',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;