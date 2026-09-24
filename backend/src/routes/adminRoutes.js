const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

// Admin routes only require role checking (they might not need approval gate if seeded, but let's keep it secure)
router.use(verifyToken, requireRole(['admin']));

router.get('/users/pending', adminController.getPendingUsers);
router.put('/users/:id/status', adminController.updateUserStatus);

router.get('/dashboard', adminController.getDashboardMetrics);
router.get('/competency', adminController.getCompetencyMap);

router.post('/notifications', adminController.createNotification);

module.exports = router;
