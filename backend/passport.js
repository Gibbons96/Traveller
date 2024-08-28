const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const User = require("./models/User");
const GOOGLE_CLIENT_ID =
  "1074416522802-s9r69jc1dpm13v313c1eh39ie6o99qpd.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            password: "randomPassword3895793408",
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Only serialize the user ID
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});
