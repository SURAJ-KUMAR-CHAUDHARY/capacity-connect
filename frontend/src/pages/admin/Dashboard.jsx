import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Users, BookOpen, UserCheck, TrendingUp } from 'lucide-react';

const mockData = {
  activeUsers: 1240,
  totalCourses: 45,
  totalEnrollments: 3890,
  pendingApprovals: 12,
  enrollmentsChart: [
    { name: 'Jan', count: 120 }, { name: 'Feb', count: 210 }, { name: 'Mar', count: 350 },
    { name: 'Apr', count: 420 }, { name: 'May', count: 510 }, { name: 'Jun', count: 680 }
  ],
  revenueChart: [
    { name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 5500 }, { name: 'Mar', revenue: 8000 },
    { name: 'Apr', revenue: 12000 }, { name: 'May', revenue: 15000 }, { name: 'Jun', revenue: 21000 }
  ]
};

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col transition-transform hover:-translate-y-1">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800 mt-2">{value}</h3>
      </div>
      <div className="p-3 bg-blue-50 rounded-xl">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
      <span className="text-emerald-500 font-medium">{trend}</span>
      <span className="text-slate-400 ml-2">vs last month</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Admin Overview</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors text-sm font-medium">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={mockData.activeUsers} icon={Users} trend="+12.5%" />
        <StatCard title="Active Courses" value={mockData.totalCourses} icon={BookOpen} trend="+4.2%" />
        <StatCard title="Total Enrollments" value={mockData.totalEnrollments} icon={TrendingUp} trend="+18.1%" />
        <StatCard title="Pending Approvals" value={mockData.pendingApprovals} icon={UserCheck} trend="-2.4%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h4 className="text-lg font-bold mb-6 text-slate-800">Monthly Enrollments</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.enrollmentsChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h4 className="text-lg font-bold mb-6 text-slate-800">Platform Growth</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData.revenueChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
