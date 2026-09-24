import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LayoutDashboard, Users, Map, Bell, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white shadow-md">
        <div className="p-4 border-b border-slate-700">
          <h1 className="text-xl font-bold text-blue-400">Capacity Connect</h1>
          <p className="text-sm text-slate-400 mt-1">Admin Portal</p>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/approvals" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition">
            <Users size={20} />
            <span>User Approvals</span>
          </Link>
          <Link to="/admin/competency" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition">
            <Map size={20} />
            <span>Competency Map</span>
          </Link>
          <Link to="/admin/announcements" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition">
            <Bell size={20} />
            <span>Announcements</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-900 text-slate-300 mt-8 transition">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">Admin Dashboard</h2>
          <div className="text-sm px-3 py-1 bg-slate-100 text-slate-800 rounded-full font-medium">
            {user?.name}
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
