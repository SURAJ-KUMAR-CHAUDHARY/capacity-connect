import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Profile = () => {
  const [profile, setProfile] = useState({
    bio: '',
    subject_expertise: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/trainer/profile');
        setProfile({
          bio: res.data.bio || '',
          subject_expertise: res.data.subject_expertise ? res.data.subject_expertise.join(', ') : ''
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await api.put('/trainer/profile', {
        bio: profile.bio,
        subject_expertise: profile.subject_expertise.split(',').map(s => s.trim()).filter(s => s)
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Trainer Profile</h3>
      {message && <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject Expertise (comma separated)</label>
          <input
            type="text"
            name="subject_expertise"
            value={profile.subject_expertise}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="e.g. Leadership, Sales, Python"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
