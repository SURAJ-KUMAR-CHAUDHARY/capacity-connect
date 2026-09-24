import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Clock, Star, Play } from 'lucide-react';
import { courses } from '../../mockData';

const CourseCatalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Explore Courses</h2>
          <p className="text-slate-500 mt-1">Find your next skill to master.</p>
        </div>
        
        <div className="flex w-full md:w-auto space-x-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>
          <button className="px-4 py-2 border border-slate-200 rounded-lg flex items-center text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {filteredCourses.map((course, idx) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all group flex flex-col">
            <div className="h-40 bg-gradient-to-br from-blue-500 to-indigo-600 p-6 flex flex-col justify-end relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
                {course.category}
              </div>
              <h3 className="text-white font-bold text-lg leading-tight z-10">{course.title}</h3>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">{course.description}</p>
              
              <div className="flex items-center justify-between text-sm text-slate-500 mt-auto pt-4 border-t border-slate-100">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1 text-blue-500" />
                  <span>{course.materials} Lessons</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon count={course.enrolled} />
                </div>
              </div>
              
              <button className="mt-5 w-full py-2.5 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center group-hover:shadow-md">
                <Play className="w-4 h-4 mr-2" />
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">No courses found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

const UsersIcon = ({ count }) => (
  <div className="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-slate-400"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    <span>{count}</span>
  </div>
);

export default CourseCatalog;
