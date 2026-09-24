import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Assessment = () => {
  const { courseId } = useParams();
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  
  // For simplicity, we just take the first assessment available for the course
  const [activeAssessment, setActiveAssessment] = useState(null);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const res = await api.get(`/trainee/courses/${courseId}/assessments`);
        setAssessments(res.data);
        if (res.data.length > 0) {
          setActiveAssessment(res.data[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessments();
  }, [courseId]);

  const handleOptionChange = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/trainee/assessments/${activeAssessment.id}/submit`, { answers });
      setResult(res.data.score);
    } catch (err) {
      alert('Failed to submit assessment');
    }
  };

  if (loading) return <div>Loading assessments...</div>;
  if (!activeAssessment) return <div>No assessments available for this course yet.</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-3xl">
      <h3 className="text-2xl font-bold mb-2">{activeAssessment.subject} Assessment</h3>
      
      {result !== null ? (
        <div className="mt-6 p-6 bg-green-50 rounded-lg text-center">
          <h4 className="text-xl font-bold text-green-800 mb-2">Assessment Completed!</h4>
          <p className="text-green-700 text-lg">Your score: {result.toFixed(2)}%</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-8">
          {activeAssessment.questions.map((q, idx) => (
            <div key={q.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-medium text-gray-900 mb-3">{idx + 1}. {q.questionText}</p>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => (
                  <label key={optIdx} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={optIdx}
                      checked={answers[q.id] === optIdx}
                      onChange={() => handleOptionChange(q.id, optIdx)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Submit Assessment
          </button>
        </form>
      )}
    </div>
  );
};

export default Assessment;
