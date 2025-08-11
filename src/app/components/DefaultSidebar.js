import React from 'react';

const DefaultSidebar = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
          {/* 좌측 광고 영역 */}
          <aside className="hidden lg:block w-[360px] bg-white shadow p-2">
            <div className="sticky top-0">
              <div className="h-screen flex items-center justify-center text-sm text-gray-500">
                광고 영역 A
              </div>
            </div>
          </aside>
          {children}
          {/* 우측 광고 영역 */}
          <aside className="hidden lg:block w-[360px] bg-white shadow p-2">
            <div className="sticky top-0">
              <div className="h-screen flex items-center justify-center text-sm text-gray-500">
                광고 영역 B
              </div>
            </div>
          </aside>
        </div>
  );
};

export default DefaultSidebar;
 