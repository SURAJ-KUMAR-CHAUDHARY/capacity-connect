import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Book, User, LayoutDashboard, LogOut, FilePlus, Video } from 'lucide-react';

const TrainerLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-900 text-white shadow-md">
        <div className="p-4 border-b border-indigo-700">
          <h1 className="text-xl font-bold">Capacity Connect</h1>
          <p className="text-sm text-indigo-300 mt-1">Trainer Portal</p>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/trainer/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-800 transition">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/trainer/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-800 transition">
            <User size={20} />
            <span>My Profile</span>
          </Link>
          <Link to="/trainer/courses" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-800 transition">
            <Book size={20} />
            <span>Course Manager</span>
          </Link>
          <Link to="/trainer/library" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-800 transition">
            <Video size={20} />
            <span>Library Upload</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-800 text-white mt-8 transition">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Welcome, {user?.name}</h2>
          <div className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
            {user?.status}
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TrainerLayout;
