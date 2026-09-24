import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Library = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    course_id: '',
    title: '',
    file_type: 'video'
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await api.get('/trainer/courses/my');
      setCourses(res.data);
      if (res.data.length > 0) {
        setFormData(f => ({ ...f, course_id: res.data[0].id }));
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const data = new FormData();
    data.append('course_id', formData.course_id);
    data.append('title', formData.title);
    data.append('file_type', formData.file_type);
    data.append('file', file);

    setUploading(true);
    try {
      await api.post('/trainer/library', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('File uploaded successfully!');
      setFormData({ ...formData, title: '' });
      setFile(null);
    } catch (err) {
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-xl">
      <h3 className="text-xl font-semibold mb-6 text-gray-800">Upload Library Resource</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Course</label>
          <select
            name="course_id"
            value={formData.course_id}
            onChange={e => setFormData({ ...formData, course_id: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Resource Title</label>
          <input type="text" name="title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">File Type</label>
          <select name="file_type" value={formData.file_type} onChange={e => setFormData({ ...formData, file_type: e.target.value })} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
            <option value="video">Video</option>
            <option value="ppt">PPT</option>
            <option value="doc">Document</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">File</label>
          <input type="file" onChange={e => setFile(e.target.files[0])} required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
        </div>
        <button type="submit" disabled={uploading} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50">
          {uploading ? 'Uploading...' : 'Upload Resource'}
        </button>
      </form>
    </div>
  );
};

export default Library;
