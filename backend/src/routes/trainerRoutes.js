const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const { verifyToken, requireRole, requireApproved } = require('../middlewares/authMiddleware');
const upload = require('../utils/upload');

router.use(verifyToken, requireApproved, requireRole(['trainer']));

router.get('/profile', trainerController.getProfile);
router.put('/profile', trainerController.updateProfile);

router.post('/courses', trainerController.createCourse);
router.get('/courses/my', trainerController.getMyCourses);

router.post('/assessments', trainerController.createAssessment);

router.post('/library', upload.single('file'), trainerController.uploadResource);

router.get('/dashboard', trainerController.getDashboardMetrics);

module.exports = router;
