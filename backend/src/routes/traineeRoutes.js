const express = require('express');
const router = express.Router();
const traineeController = require('../controllers/traineeController');
const { verifyToken, requireRole, requireApproved } = require('../middlewares/authMiddleware');

router.use(verifyToken, requireApproved, requireRole(['trainee']));

router.get('/profile', traineeController.getProfile);
router.put('/profile', traineeController.updateProfile);

router.get('/courses/available', traineeController.getAvailableCourses);
router.post('/courses/enroll', traineeController.enrollCourse);
router.get('/courses/my', traineeController.getMyCourses);

router.get('/courses/:courseId/assessments', traineeController.getCourseAssessments);
router.post('/assessments/:assessmentId/submit', traineeController.submitAssessment);

router.post('/feedback', traineeController.submitFeedback);

module.exports = router;
