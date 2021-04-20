import passport from 'passport';
import mongoose from 'mongoose';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import selectedKeys from '../config/keys';

(async () => {
  const keys = await selectedKeys();
  const User = mongoose.model('users');

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true,
  }, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }
    const user = await new User({ googleId: profile.id }).save();
    return done(null, user);
  }));
})();
