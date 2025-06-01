import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const SIDEBAR_WIDTH = 256; // 64 * 4 = 256px

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div
        className="flex-1 flex flex-col min-w-0"
        style={{ marginLeft: SIDEBAR_WIDTH }}
      >
        <Topbar />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
