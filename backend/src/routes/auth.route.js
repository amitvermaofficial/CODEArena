import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
}));

router.post('/logout', (req, res) => {
  req.logout(() => {
    res.send("Logged out successfully");
  });
});

export default router;
