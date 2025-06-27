// routes/index.js
import express from 'express';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import problemRouter from './problem.routes.js';
import postRouter from './post.routes.js';
import contestRouter from './contest.routes.js';
// import collaborationRouter from './collaboration.routes.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/problems', problemRouter);
router.use('/posts', postRouter);
router.use('/contests', contestRouter);
// router.use('/collaboration', collaborationRouter);

export default router;