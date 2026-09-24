const pool = require('../db');

const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.name, u.email, tp.* 
       FROM users u 
       JOIN trainer_profiles tp ON u.id = tp.user_id 
       WHERE u.id = $1`,
      [req.userId]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  const { subject_expertise, bio } = req.body;
  try {
    const result = await pool.query(
      `UPDATE trainer_profiles 
       SET subject_expertise = $1, bio = $2 
       WHERE user_id = $3 RETURNING *`,
      [JSON.stringify(subject_expertise || []), bio, req.userId]
    );
    res.json({ message: 'Profile updated', profile: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createCourse = async (req, res) => {
  const { title, description, category, deadline } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO courses (title, description, category, trainer_id, deadline) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, category, req.userId, deadline]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses WHERE trainer_id = $1', [req.userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createAssessment = async (req, res) => {
  const { course_id, subject, questions, deadline } = req.body;
  try {
    // Check if course belongs to trainer
    const course = await pool.query('SELECT trainer_id FROM courses WHERE id = $1', [course_id]);
    if (course.rows.length === 0 || course.rows[0].trainer_id !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized for this course' });
    }

    const result = await pool.query(
      'INSERT INTO assessments (course_id, subject, questions, deadline, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [course_id, subject, JSON.stringify(questions), deadline, req.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const uploadResource = async (req, res) => {
  const { course_id, title, file_type } = req.body;
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const fileUrl = `/uploads/${req.file.filename}`;
  try {
    const result = await pool.query(
      'INSERT INTO library_resources (trainer_id, course_id, file_type, file_url, title) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.userId, course_id, file_type, fileUrl, title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getDashboardMetrics = async (req, res) => {
  try {
    // Total courses
    const coursesRes = await pool.query('SELECT COUNT(*) as count FROM courses WHERE trainer_id = $1', [req.userId]);
    
    // Enrollments per course for chart
    const enrollmentsRes = await pool.query(
      `SELECT c.title as name, COUNT(e.id) as enrollments 
       FROM courses c LEFT JOIN enrollments e ON c.id = e.course_id 
       WHERE c.trainer_id = $1 GROUP BY c.id`,
      [req.userId]
    );

    // Average scores per course
    const scoresRes = await pool.query(
      `SELECT c.title as name, COALESCE(AVG(aa.score), 0) as average_score
       FROM courses c
       JOIN assessments a ON c.id = a.course_id
       LEFT JOIN assessment_attempts aa ON a.id = aa.assessment_id
       WHERE c.trainer_id = $1 GROUP BY c.id`,
      [req.userId]
    );

    res.json({
      totalCourses: parseInt(coursesRes.rows[0].count),
      enrollmentsChart: enrollmentsRes.rows.map(r => ({ ...r, enrollments: parseInt(r.enrollments) })),
      scoresChart: scoresRes.rows.map(r => ({ ...r, average_score: parseFloat(r.average_score) }))
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  createCourse,
  getMyCourses,
  createAssessment,
  uploadResource,
  getDashboardMetrics
};
