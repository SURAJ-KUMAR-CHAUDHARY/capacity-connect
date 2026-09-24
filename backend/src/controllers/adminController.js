const pool = require('../db');

const getPendingUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role, status FROM users WHERE status = $1', ['pending']);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'approved' or 'rejected'
  
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    await pool.query('UPDATE users SET status = $1 WHERE id = $2', [status, id]);
    res.json({ message: `User ${status} successfully` });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getDashboardMetrics = async (req, res) => {
  try {
    const usersCount = await pool.query('SELECT COUNT(*) FROM users WHERE status = $1', ['approved']);
    const coursesCount = await pool.query('SELECT COUNT(*) FROM courses');
    const enrollmentsCount = await pool.query('SELECT COUNT(*) FROM enrollments');
    
    // For charts: Enrollments over time (mocked as simple grouping by course for now)
    const enrollmentsDist = await pool.query(`
      SELECT c.title as name, COUNT(e.id) as count 
      FROM courses c LEFT JOIN enrollments e ON c.id = e.course_id 
      GROUP BY c.id
    `);

    res.json({
      activeUsers: parseInt(usersCount.rows[0].count),
      totalCourses: parseInt(coursesCount.rows[0].count),
      totalEnrollments: parseInt(enrollmentsCount.rows[0].count),
      enrollmentsChart: enrollmentsDist.rows.map(r => ({ name: r.name, count: parseInt(r.count) }))
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getCompetencyMap = async (req, res) => {
  try {
    // A simplified competency map: List trainers, their expertise, and average rating from feedback
    const result = await pool.query(`
      SELECT u.id, u.name, tp.subject_expertise, COALESCE(AVG(f.rating), 0) as average_rating
      FROM users u
      JOIN trainer_profiles tp ON u.id = tp.user_id
      LEFT JOIN courses c ON u.id = c.trainer_id
      LEFT JOIN feedback f ON c.id = f.course_id
      WHERE u.role = 'trainer' AND u.status = 'approved'
      GROUP BY u.id, tp.subject_expertise
      ORDER BY average_rating DESC
    `);
    
    // Transform into a subject-based map
    const competencyMap = {};
    result.rows.forEach(trainer => {
      const subjects = trainer.subject_expertise || [];
      subjects.forEach(sub => {
        if (!competencyMap[sub]) competencyMap[sub] = [];
        competencyMap[sub].push({
          id: trainer.id,
          name: trainer.name,
          rating: parseFloat(trainer.average_rating).toFixed(1)
        });
      });
    });

    res.json(competencyMap);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createNotification = async (req, res) => {
  const { title, content, type } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO notifications (title, content, type, published_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, content, type, req.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPendingUsers,
  updateUserStatus,
  getDashboardMetrics,
  getCompetencyMap,
  createNotification
};
