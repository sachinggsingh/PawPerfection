import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config(); 

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email']
}, async function verify(accessToken, refreshToken, profile, cb) {
  try {
    const existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) {
      return cb(null, existingUser);
    }

    // Try to find by email if user signed up via normal email before
    const existingEmailUser = await User.findOne({ email: profile.emails[0].value });
    if (existingEmailUser) {
      existingEmailUser.googleId = profile.id;
      await existingEmailUser.save();
      return cb(null, existingEmailUser);
    }

    // Create new Google user
    const newUser = new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
    });
    await newUser.save();
    return cb(null, newUser);

  } catch (err) {
    return cb(err);
  }
}));

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
