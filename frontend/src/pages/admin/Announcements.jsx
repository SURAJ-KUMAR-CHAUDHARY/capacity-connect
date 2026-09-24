import React, { useState } from 'react';
import api from '../../services/api';

const Announcements = () => {
  const [formData, setFormData] = useState({ title: '', content: '', type: 'announcement' });
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/notifications', formData);
      setMessage('Announcement published successfully!');
      setFormData({ title: '', content: '', type: 'announcement' });
    } catch (err) {
      setMessage('Failed to publish announcement.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 max-w-2xl">
      <h3 className="text-xl font-semibold mb-6 text-slate-800">Publish Announcement</h3>
      {message && <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Title</label>
          <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required className="mt-1 block w-full p-2 border border-slate-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Type</label>
          <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="mt-1 block w-full p-2 border border-slate-300 rounded-md">
            <option value="announcement">General Announcement</option>
            <option value="achievement">Achievement</option>
            <option value="content">New Content Alert</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Content</label>
          <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required className="mt-1 block w-full p-2 border border-slate-300 rounded-md" rows="4"></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Publish</button>
      </form>
    </div>
  );
};

export default Announcements;
