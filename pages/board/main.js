import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DefaultLayout from '@/app/components/DefaultLayout';

const Editor = dynamic(() => import('../../utils/editor'), {
  ssr: false, // 서버 사이드 렌더링을 비활성화
});

const QuillEditor = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  return (
    <DefaultLayout>
      <div class="container">
        <Editor
          readOnly={readOnly}
          defaultValue={'Hello'}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
        />
        <div class="controls">
          <label>
            Read Only:{' '}
            <input
              type="checkbox"
              value={readOnly}
              onChange={(e) => setReadOnly(e.target.checked)}
            />
          </label>
          <button
            className="controls-right"
            type="button"
            onClick={() => {}}
          >
            Get Content Length
          </button>
        </div>
        <div className="state">
          <div className="state-title">Current Range:</div>
          {range ? JSON.stringify(range) : 'Empty'}
        </div>
        <div className="state">
          <div className="state-title">Last Change:</div>
          {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default QuillEditor;