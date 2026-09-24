const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Admins might be auto-approved in some systems, but we'll stick to pending for everyone unless handled separately
    const status = role === 'admin' ? 'pending' : 'pending';

    await pool.query('BEGIN');
    
    const newUserResult = await pool.query(
      'INSERT INTO users (name, email, password_hash, role, status) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [name, email, hashedPassword, role, status]
    );
    
    const userId = newUserResult.rows[0].id;

    if (role === 'trainee') {
      await pool.query('INSERT INTO trainee_profiles (user_id) VALUES ($1)', [userId]);
    } else if (role === 'trainer') {
      await pool.query('INSERT INTO trainer_profiles (user_id) VALUES ($1)', [userId]);
    }

    await pool.query('COMMIT');

    res.status(201).json({ message: 'User registered successfully. Pending approval.' });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.status === 'rejected') {
      return res.status(403).json({ message: 'Your account has been rejected.' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, status: user.status },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login
};
