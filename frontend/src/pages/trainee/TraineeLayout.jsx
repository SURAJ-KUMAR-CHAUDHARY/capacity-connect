import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BookOpen, User, List, LogOut, CheckSquare } from 'lucide-react';

const TraineeLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">Capacity Connect</h1>
          <p className="text-sm text-gray-500 mt-1">Trainee Portal</p>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/trainee/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600">
            <User size={20} />
            <span>My Profile</span>
          </Link>
          <Link to="/trainee/courses" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600">
            <List size={20} />
            <span>Course Catalog</span>
          </Link>
          <Link to="/trainee/my-courses" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600">
            <BookOpen size={20} />
            <span>My Courses</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 mt-8">
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

export default TraineeLayout;
