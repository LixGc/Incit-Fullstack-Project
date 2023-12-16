
import { Outlet } from 'react-router';
import { Sidebar } from './sidebar';

export const Layout = () => {
    return (
      <div className="font-sans bg-gray-100 dark:bg-gray-800 min-h-screen">
        <Sidebar />
        <Outlet />
      </div>
    );
  };