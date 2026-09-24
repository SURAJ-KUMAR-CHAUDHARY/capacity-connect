const pool = require('../db');

const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.name, u.email, tp.* 
       FROM users u 
       JOIN trainee_profiles tp ON u.id = tp.user_id 
       WHERE u.id = $1`,
      [req.userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  const { qualifications, experience, interests, skills } = req.body;
  try {
    const result = await pool.query(
      `UPDATE trainee_profiles 
       SET qualifications = $1, experience = $2, interests = $3, skills = $4 
       WHERE user_id = $5 RETURNING *`,
      [qualifications, experience, interests, JSON.stringify(skills || []), req.userId]
    );
    res.json({ message: 'Profile updated successfully', profile: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAvailableCourses = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.*, u.name as trainer_name 
       FROM courses c 
       LEFT JOIN users u ON c.trainer_id = u.id 
       WHERE c.status = 'active' AND c.id NOT IN (
         SELECT course_id FROM enrollments WHERE trainee_id = $1
       )`
       , [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const enrollCourse = async (req, res) => {
  const { courseId } = req.body;
  try {
    await pool.query(
      'INSERT INTO enrollments (trainee_id, course_id) VALUES ($1, $2)',
      [req.userId, courseId]
    );
    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ message: 'Already enrolled' });
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT e.*, c.title, c.description, c.category 
       FROM enrollments e 
       JOIN courses c ON e.course_id = c.id 
       WHERE e.trainee_id = $1`,
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getCourseAssessments = async (req, res) => {
  const { courseId } = req.params;
  try {
    const result = await pool.query(
      `SELECT id, subject, deadline, 
       (SELECT jsonb_agg(jsonb_build_object('id', q->>'id', 'questionText', q->>'questionText', 'options', q->'options')) 
        FROM jsonb_array_elements(questions) q) as questions
       FROM assessments WHERE course_id = $1`,
      [courseId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const submitAssessment = async (req, res) => {
  const { assessmentId } = req.params;
  const { answers } = req.body; // { "questionId": "selectedOption" }
  
  try {
    const assessmentResult = await pool.query('SELECT questions FROM assessments WHERE id = $1', [assessmentId]);
    if (assessmentResult.rows.length === 0) return res.status(404).json({ message: 'Assessment not found' });
    
    const questions = assessmentResult.rows[0].questions;
    let score = 0;
    const total = questions.length;
    
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });
    
    const percentage = (score / total) * 100;
    
    await pool.query(
      'INSERT INTO assessment_attempts (trainee_id, assessment_id, score) VALUES ($1, $2, $3)',
      [req.userId, assessmentId, percentage]
    );
    
    res.json({ message: 'Assessment submitted', score: percentage });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const submitFeedback = async (req, res) => {
  const { courseId, rating, comments } = req.body;
  try {
    await pool.query(
      'INSERT INTO feedback (trainee_id, course_id, rating, comments) VALUES ($1, $2, $3, $4)',
      [req.userId, courseId, rating, comments]
    );
    res.json({ message: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAvailableCourses,
  enrollCourse,
  getMyCourses,
  getCourseAssessments,
  submitAssessment,
  submitFeedback
};
