import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRoleLower = user.role ? user.role.toLowerCase() : '';
  const userStatusLower = user.status ? user.status.toLowerCase() : '';

  if (allowedRoles && !allowedRoles.map(r => r.toLowerCase()).includes(userRoleLower)) {
    // Redirect to their appropriate dashboard if they try to access wrong role
    if (userRoleLower === 'admin') return <Navigate to="/admin" replace />;
    if (userRoleLower === 'trainer') return <Navigate to="/trainer" replace />;
    if (userRoleLower === 'trainee') return <Navigate to="/trainee" replace />;
  }

  if (userStatusLower !== 'approved' && userRoleLower !== 'admin') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Pending</h2>
        <p className="text-gray-600">Your account is currently pending approval from an administrator.</p>
        <a href="/login" className="mt-4 text-blue-600 hover:underline">Return to Login</a>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
