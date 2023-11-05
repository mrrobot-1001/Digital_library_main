// AdminLayout.js
import React from 'react';
import HomePage from './HomePage';

function HomeLayout({ children }) {
  return (
    <div>
      <HomePage />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default HomeLayout;
