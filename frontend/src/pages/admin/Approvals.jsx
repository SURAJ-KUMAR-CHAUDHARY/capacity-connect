import React, { useState, useEffect } from 'react';
import { Check, X, ShieldAlert, User, Search } from 'lucide-react';
import { pendingApprovals } from '../../mockData';

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setApprovals(pendingApprovals);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleAction = (id, action) => {
    setApprovals(prev => prev.filter(a => a.id !== id));
    // In a real app, this would show a toast notification
  };

  if (loading) return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Pending Approvals</h2>
          <p className="text-slate-500 mt-1">Review and manage new user registrations.</p>
        </div>
        <div className="relative w-64 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {approvals.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="bg-emerald-50 p-4 rounded-full mb-4">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">All caught up!</h3>
            <p className="text-slate-500">There are no pending approvals at the moment.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-sm text-slate-500 uppercase tracking-wider">
                  <th className="p-4 font-semibold">User</th>
                  <th className="p-4 font-semibold">Role Requested</th>
                  <th className="p-4 font-semibold">Date Applied</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {approvals.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mr-3">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{user.name}</p>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'Trainer' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      Just now
                    </td>
                    <td className="p-4 text-right space-x-2 flex justify-end">
                      <button 
                        onClick={() => handleAction(user.id, 'reject')}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors tooltip-trigger"
                        title="Reject"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleAction(user.id, 'approve')}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Approvals;
