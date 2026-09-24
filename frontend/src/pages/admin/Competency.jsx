import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Competency = () => {
  const [map, setMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMap = async () => {
      try {
        const res = await api.get('/admin/competency');
        setMap(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMap();
  }, []);

  if (loading) return <div>Loading competency map...</div>;

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-slate-800">Competency Map</h3>
      <p className="text-slate-600">Ranked trainers by subject expertise and average feedback ratings.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(map).map(([subject, trainers]) => (
          <div key={subject} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h4 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b">{subject}</h4>
            <ul className="space-y-3">
              {trainers.map((trainer, idx) => (
                <li key={trainer.id} className="flex justify-between items-center">
                  <span className="text-slate-700 flex items-center">
                    <span className="w-6 text-slate-400 text-sm">{idx + 1}.</span>
                    {trainer.name}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Rating: {trainer.rating}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Competency;
