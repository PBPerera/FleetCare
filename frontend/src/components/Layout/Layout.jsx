import React from 'react';


const Layout = ({ title, children }) => {
  return (
    <div className="layout">
      
      <div className="main-content">
        
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;