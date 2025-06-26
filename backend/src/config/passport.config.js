import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import User from '../models/User.js'; // adjust path

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return done(null, false, { message: 'Invalid credentials' });
    }
    return done(null, user);
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
