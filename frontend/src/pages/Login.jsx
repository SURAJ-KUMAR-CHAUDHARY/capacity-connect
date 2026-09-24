import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { users } from '../mockData';

const Login = () => {
  const { setMockUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDemoLogin = (role) => {
    const demoUser = users.find(u => u.role === role);
    if(demoUser) {
      setMockUser(demoUser);
      if(role === 'Admin') navigate('/admin');
      else if(role === 'Trainer') navigate('/trainer');
      else navigate('/trainee');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Select a demo account below to bypass login.
          </p>
        </div>
        <div className="mt-8 space-y-4">
            <button
              onClick={() => handleDemoLogin('Admin')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-colors"
            >
              Login as Admin Demo
            </button>
            <button
              onClick={() => handleDemoLogin('Trainer')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none transition-colors"
            >
              Login as Trainer Demo
            </button>
            <button
              onClick={() => handleDemoLogin('Trainee')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors"
            >
              Login as Trainee Demo
            </button>
        </div>
        <div className="text-center text-sm mt-6">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
