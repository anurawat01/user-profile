const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const profileController = require('../controllers/profileController');

router.get('/my-profile', authMiddleware.verifyToken, profileController.getUserProfile);
router.put('/update-my-profile', authMiddleware.verifyToken, profileController.editUserProfile);
router.get('/get-all-profiles', authMiddleware.verifyToken, profileController.getAllUserProfiles);

module.exports = router;
