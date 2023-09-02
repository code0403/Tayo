import React, { ReactNode } from 'react';
import Nav from './Navbar/Nav';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Nav />
      <main className="flex-grow p-4 pl-[20%] sm:ml-48 md:ml-56">
        {children}
      </main>
    </div>
  );
};

export default Layout;
