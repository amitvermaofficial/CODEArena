// routes/users.routes.js
const express = require('express');
const router = express.Router();
// const { protect } = require('../middleware/auth.middleware');

// @route   GET api/users/profile/:username
// @desc    Get a user's public profile
// @access  Public
router.get('/profile/:username', /* getUserProfile */);

// @route   PUT api/users/profile
// @desc    Update the logged-in user's profile
// @access  Private
router.put('/profile', /* protect, updateUserProfile */);

// --- Connection Routes ---

// @route   GET api/users/connections
// @desc    Get the logged-in user's connections
// @access  Private
router.get('/connections', /* protect, getConnections */);

// @route   POST api/users/connections/request/:userId
// @desc    Send a connection request to another user
// @access  Private
router.post('/connections/request/:userId', /* protect, sendConnectionRequest */);

// @route   POST api/users/connections/accept/:requestId
// @desc    Accept a connection request
// @access  Private
router.post('/connections/accept/:requestId', /* protect, acceptConnectionRequest */);

// @route   DELETE api/users/connections/:userId
// @desc    Remove a connection
// @access  Private
router.delete('/connections/:userId', /* protect, removeConnection */);

module.exports = router;