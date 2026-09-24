import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TraineeLayout from './pages/trainee/TraineeLayout';
import Profile from './pages/trainee/Profile';
import CourseCatalog from './pages/trainee/CourseCatalog';
import MyCourses from './pages/trainee/MyCourses';
import Assessment from './pages/trainee/Assessment';

import TrainerLayout from './pages/trainer/TrainerLayout';
import TrainerProfile from './pages/trainer/Profile';
import TrainerDashboard from './pages/trainer/Dashboard';
import CourseManager from './pages/trainer/CourseManager';
import Library from './pages/trainer/Library';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Approvals from './pages/admin/Approvals';
import Competency from './pages/admin/Competency';
import Announcements from './pages/admin/Announcements';

import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="approvals" element={<Approvals />} />
            <Route path="competency" element={<Competency />} />
            <Route path="announcements" element={<Announcements />} />
          </Route>
          
          <Route path="/trainer" element={<ProtectedRoute allowedRoles={['trainer']}><TrainerLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TrainerDashboard />} />
            <Route path="profile" element={<TrainerProfile />} />
            <Route path="courses" element={<CourseManager />} />
            <Route path="library" element={<Library />} />
          </Route>
          
          <Route path="/trainee" element={<ProtectedRoute allowedRoles={['trainee']}><TraineeLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="courses" element={<CourseCatalog />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="courses/:courseId/assessments" element={<Assessment />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
