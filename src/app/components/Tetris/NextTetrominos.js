import React from 'react';

const NextTetrominos = ({ queue }) => {
  const cellSize = 20;

  // 고정된 블록 박스 크기
  const blockWidth = cellSize * 5; // 너비 5칸
  const blockHeight = cellSize * 2; // 높이 2칸
  const blockGap = cellSize * 1; // 블록 간 간격
  const borderPadding = cellSize * 1; // 테두리 간격

  // 각 셀 스타일
  const cellStyle = {
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    backgroundColor: '#0ff',
    border: '1px solid #444',
  };

  // 전체 미리보기 박스 스타일
  const unifiedPreviewStyle = {
    width: `${blockWidth}px`,
    paddingTop: `${borderPadding}px`,
    paddingBottom: `${borderPadding}px`,
    backgroundColor: '#222',
    border: '2px solid #0ff',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: `${blockGap}px`, // 블록 간 간격
  };

  // 각 블록을 담는 박스 스타일
  const blockWrapperStyle = {
    width: `${blockWidth}px`,
    height: `${blockHeight}px`,
    display: 'flex',
    alignItems: 'top',
    justifyContent: 'center',
  };

  // 블록 렌더링 함수
  const renderTetromino = (tetromino) => {
    if (!tetromino || !tetromino.shape) return null;

    return (
      <div>
        {tetromino.shape.map((row, y) => (
          <div key={y} style={{ display: 'flex', justifyContent: 'center' }}>
            {row.map((cell, x) => (
              <div
                key={x}
                style={{
                  ...cellStyle,
                  backgroundColor: cell ? tetromino.color : 'transparent',
                  border: cell ? '1px solid #444' : 'none',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: `${cellSize}px` }}>
      <div style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
        Next Tetromino
      </div>

      <div style={unifiedPreviewStyle}>
        {queue.slice(0, 4).map((tetromino, index) => (
          <div key={index} style={blockWrapperStyle}>
            {renderTetromino(tetromino)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextTetrominos;