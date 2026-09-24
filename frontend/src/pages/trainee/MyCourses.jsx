import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, CheckCircle, Award } from 'lucide-react';
import { courses } from '../../mockData';

const MyCourses = () => {
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock network request
    const timer = setTimeout(() => {
      // Add fake progress to mock courses
      const mockedEnrollments = courses.map(c => ({
        ...c,
        progress: Math.floor(Math.random() * 60) + 20, // random progress 20-80%
      }));
      setEnrolled(mockedEnrollments);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h3 className="text-2xl font-bold text-slate-800">My Learning Path</h3>
        <p className="text-slate-500 mt-1">Pick up where you left off and keep growing.</p>
      </div>
      
      {enrolled.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-lg font-medium text-slate-600">You haven't enrolled in any courses yet.</p>
          <Link to="/trainee/courses" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {enrolled.map(course => (
            <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                    {course.category}
                  </span>
                  <h4 className="text-xl font-bold text-slate-800 mt-3">{course.title}</h4>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{course.description}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <PlayCircle className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">Course Progress</span>
                  <span className="font-bold text-blue-600">{course.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  Continue Learning
                </button>
                <Link
                  to={`/trainee/courses/${course.id}/assessments`}
                  className="px-4 py-2 bg-slate-50 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors border border-slate-200 flex items-center justify-center"
                >
                  <CheckCircle className="w-4 h-4 mr-2 text-slate-500" />
                  Assessments
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
