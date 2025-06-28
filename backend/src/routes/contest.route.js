import express from "express"
const router = express.Router();
import { protect } from '../middlewares/auth.middleware.js';
import { admin } from '../middlewares/admin.middleware.js';

import {
  getAllContests,
  getContestDetails,
  registerForContest,
  getContestLeaderboard,
  submitContestSolution,
  createContest,
  updateContest,
  deleteContest
} from '../controllers/contest.controller.js';

// --- User Routes ---

// @route   GET api/contests
// @desc    Get all upcoming, ongoing, and past contests
// @access  Public
router.get('/', getAllContests);

// @route   GET api/contests/:contestId
// @desc    Get details of a single contest
// @access  Public
router.get('/:contestId', getContestDetails);

// @route   POST api/contests/:contestId/register
// @desc    Register the logged-in user for a contest
// @access  Private
router.post('/:contestId/register', protect, registerForContest);

// @route   GET api/contests/:contestId/leaderboard
// @desc    Get the leaderboard for a contest
// @access  Public
router.get('/:contestId/leaderboard', getContestLeaderboard);

// @route   POST api/contests/:contestId/submit/:problemId
// @desc    Submit a solution for a problem within a contest
// @access  Private
router.post('/:contestId/submit/:problemId', protect, submitContestSolution);

// --- Admin Routes ---

// @route   POST api/contests
// @desc    Create a new contest
// @access  Private/Admin
router.post('/', protect, admin, createContest);

// @route   PUT api/contests/:contestId
// @desc    Update a contest (e.g., add problems, change time)
// @access  Private/Admin
router.put('/:contestId', protect, admin, updateContest);

// @route   DELETE api/contests/:contestId
// @desc    Delete a contest
// @access  Private/Admin
router.delete('/:contestId', protect, admin, deleteContest);

export default router;