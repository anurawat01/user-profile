const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const config = require('./config');

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/auth/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        profile.accessToken = accessToken;
        return done(null, profile);
    }
));
