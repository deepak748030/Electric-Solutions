
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  // Check if user is authenticated and is an admin
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  if (!isAdmin) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        <main className={cn("p-6 max-w-[1600px] mx-auto")}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
