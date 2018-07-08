import passport from 'passport';
import JwtStrategy, { ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import User from './models/userModel';
import fs from 'fs';


// JWT Strategy
let config = JSON.parse(fs.readFileSync('.env.json', 'utf8'));
passport.use(new JwtStrategy.Strategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (!user)
      return done(null, false);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));


// Local Strategy
passport.use(new LocalStrategy.Strategy({
  usernameField: 'email',
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user)
      return done(null, false);
    if (await user.isValidPassword(password))
      return done(null, user);
    else
      done(null, false);
  } catch (error) {
    done(error, false);
  }
}));





export default passport;