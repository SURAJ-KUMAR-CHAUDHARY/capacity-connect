import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const CourseManager = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    deadline: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get('/trainer/courses/my');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/trainer/courses', formData);
      setFormData({ title: '', description: '', category: '', deadline: '' });
      fetchCourses();
    } catch (err) {
      alert('Failed to create course');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-2xl">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Create New Course</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows="3"></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deadline</label>
              <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Create Course</button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">My Courses</h3>
        {loading ? <div>Loading...</div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map(course => (
              <div key={course.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold text-lg">{course.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{course.category}</p>
                <p className="text-sm text-gray-700">{course.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManager;
