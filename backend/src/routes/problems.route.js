// routes/problem.routes.js
import express from 'express';
import { protect, admin } from '../middleware/auth.middleware.js';
// Import controllers and validations as you create them
// import { createProblem, getAllProblems, ... } from '../controllers/problem.controller.js';
// import { createProblemValidation } from '../validations/problem.validation.js';

const router = express.Router();

// --- User Routes ---
// GET api/problems -> Get all problems (with filters)
router.get('/', /* getAllProblems */);

// GET api/problems/:problemId -> Get a single problem
router.get('/:problemId', /* getProblemById */);

// POST api/problems/:problemId/submit -> Submit solution
router.post('/:problemId/submit', protect, /* submitSolution */);

// GET api/problems/:problemId/submissions -> Get my submissions for a problem
router.get('/:problemId/submissions', protect, /* getMySubmissionsForProblem */);


// --- Admin Routes ---
// POST api/problems -> Create a new problem
router.post('/', protect, admin, /* createProblemValidation, handleValidationErrors, createProblem */);

// PUT api/problems/:problemId -> Update a problem
router.put('/:problemId', protect, admin, /* updateProblem */);

// DELETE api/problems/:problemId -> Delete a problem
router.delete('/:problemId', protect, admin, /* deleteProblem */);

export default router;