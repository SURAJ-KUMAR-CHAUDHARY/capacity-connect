import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Profile = () => {
  const [profile, setProfile] = useState({
    qualifications: '',
    experience: '',
    interests: '',
    skills: '' // We will handle this as a comma-separated string for simplicity
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/trainee/profile');
        const data = res.data;
        setProfile({
          qualifications: data.qualifications || '',
          experience: data.experience || '',
          interests: data.interests || '',
          skills: data.skills ? data.skills.join(', ') : ''
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
      await api.put('/trainee/profile', {
        ...profile,
        skills: profile.skills.split(',').map(s => s.trim()).filter(s => s)
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
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-4">My Profile</h3>
      {message && <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Qualifications</label>
          <textarea
            name="qualifications"
            value={profile.qualifications}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="2"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Experience</label>
          <textarea
            name="experience"
            value={profile.experience}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="2"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Interests</label>
          <input
            type="text"
            name="interests"
            value={profile.interests}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={profile.skills}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. React, Node.js, Project Management"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
