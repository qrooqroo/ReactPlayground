import React from 'react';
import DefaultNav from '@/app/components/DefaultNav';
import DefaultSidebar from '@/app/components/DefaultSidebar';
import DefaultFooter from '@/app/components/DefaultFooter';

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <DefaultNav></DefaultNav>
      <main>
       <DefaultSidebar>
        {children}
       </DefaultSidebar>
      </main>
      <DefaultFooter></DefaultFooter>
    </div>
  );
};

export default DefaultLayout;