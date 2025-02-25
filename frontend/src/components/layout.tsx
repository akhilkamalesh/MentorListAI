import React from 'react';
import Header from './header';
import '../assets/css/layout.css'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <Header />
      <div className="page-content">{children}</div>
    </div>
  );
};

export default Layout;
