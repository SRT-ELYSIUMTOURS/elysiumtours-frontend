import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminLayout = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});

  // Protected Route Logic
  if (!isAuthenticated) {
    // In a real app, redirection to login should be active.
    // However, since we're setting up, maybe allow for dev?
    // Let's keep it protected for now to align with SOP.
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-layout flex min-h-screen bg-tertiary-light-default font-raleway">
      <aside className="w-64 bg-secondary-dark-darker text-primary-light-default p-6 sticky top-0 h-screen overflow-y-auto">
        <h2 className="text-lg font-bold mb-8">Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
          {/* Admin Navigation Links */}
          <a href="/admin/dashboard" className="px-4 py-3 rounded-md hover:bg-secondary-dark-default transition-colors">Overview</a>
          <a href="/admin/tours" className="px-4 py-3 rounded-md hover:bg-secondary-dark-default transition-colors">Manage Tours</a>
          <a href="/admin/partners" className="px-4 py-3 rounded-md hover:bg-secondary-dark-default transition-colors">Partners</a>
          <a href="/admin/blogs" className="px-4 py-3 rounded-md hover:bg-secondary-dark-default transition-colors">Blogs</a>
          <a href="/admin/messages" className="px-4 py-3 rounded-md hover:bg-secondary-dark-default transition-colors">Messages</a>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-primary-dark-default">
          <h1 className="text-2xl font-bold text-tertiary-normal-default">Admin Panel</h1>
          <div className="flex items-center gap-4">
             <span className="text-sm font-medium">{user?.email || 'Admin User'}</span>
             <button className="px-4 py-2 bg-secondary-normal-default text-white rounded-md hover:bg-secondary-normal-hover transition-colors">Logout</button>
          </div>
        </header>
        <section className="bg-white rounded-xl p-6 shadow-sm border border-primary-dark-default min-h-[500px]">
           <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;