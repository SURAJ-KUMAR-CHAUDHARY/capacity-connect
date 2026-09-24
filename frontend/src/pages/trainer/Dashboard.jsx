import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { BookOpen, Users, Star, Clock } from 'lucide-react';

const mockData = {
  totalCourses: 8,
  activeStudents: 245,
  avgRating: 4.8,
  totalHours: 124,
  enrollmentsChart: [
    { name: 'React Basics', enrollments: 120 },
    { name: 'Advanced Node', enrollments: 85 },
    { name: 'System Design', enrollments: 40 },
  ],
  scoresChart: [
    { name: 'React Basics', average_score: 88 },
    { name: 'Advanced Node', average_score: 75 },
    { name: 'System Design', average_score: 92 },
  ]
};

const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center transition-transform hover:-translate-y-1">
    <div className={`p-4 rounded-xl mr-5 ${bgColorClass}`}>
      <Icon className={`w-7 h-7 ${colorClass}`} />
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Trainer Dashboard</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center">
          <BookOpen className="w-4 h-4 mr-2" />
          Create Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="My Courses" value={mockData.totalCourses} icon={BookOpen} colorClass="text-indigo-600" bgColorClass="bg-indigo-50" />
        <StatCard title="Active Students" value={mockData.activeStudents} icon={Users} colorClass="text-blue-600" bgColorClass="bg-blue-50" />
        <StatCard title="Average Rating" value={mockData.avgRating} icon={Star} colorClass="text-amber-500" bgColorClass="bg-amber-50" />
        <StatCard title="Content Hours" value={mockData.totalHours} icon={Clock} colorClass="text-emerald-600" bgColorClass="bg-emerald-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h4 className="text-lg font-bold mb-6 text-slate-800">Course Enrollments</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.enrollmentsChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="enrollments" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h4 className="text-lg font-bold mb-6 text-slate-800">Average Scores</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.scoresChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="average_score" stroke="#10b981" strokeWidth={3} dot={{r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
