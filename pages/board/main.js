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
          defaultValue={''}
          onSelectionChange={setRange}
          onTextChange={setLastChange}
        />
      </div>
    </DefaultLayout>
  );
};

export default QuillEditor;