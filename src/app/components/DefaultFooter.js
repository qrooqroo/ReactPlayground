import React from 'react';

const DefaultFooter = ({ children }) => {
  return (
    <footer>
      <div className="bg-gray-800 text-white py-20">
        <div className="container mx-auto text-center">
          <p className="text-sm">© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          <p className="text-xs">Made with ❤️ by Your Team</p>
        </div>
      </div>
    </footer>
  );
};

export default DefaultFooter;
 