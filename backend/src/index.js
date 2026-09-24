require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const authRoutes = require('./routes/authRoutes');
const traineeRoutes = require('./routes/traineeRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Routes will be added here
app.use('/api/auth', authRoutes);
app.use('/api/trainee', traineeRoutes);
app.use('/api/trainer', trainerRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Capacity Connect API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
