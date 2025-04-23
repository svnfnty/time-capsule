const express = require('express');
const router = express.Router();
const capsuleController = require('../controllers/capsuleController');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Create a new time capsule
router.post('/', upload.single('file'), capsuleController.createCapsule);

// Get capsule content (if unlocked or owner)
router.get('/:capsuleId', capsuleController.getCapsuleContent);

// Get all capsules for current user
router.get('/', capsuleController.getUserCapsules);

// Check if capsule is unlocked
router.get('/:capsuleId/status', capsuleController.checkCapsuleStatus);

module.exports = router;