var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const UserInfoError = require('passport-google-oauth20/lib/errors/userinfoerror');

//cambiar variables por un archivo .env
const GOOGLE_CLIENT_ID = "502504690344-hfbd6oo4t4apba7f9ehqrobo3146qifd.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";





passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done){
    User.findOrCreate({googleId: profile.id}, function(err,user){
      return cb(err,user)
    });
  }
));


//Estos metodos son inicializados debido a que estamos usando sesiones 
passport.serializeUser((user, done)=>{
    done(null, user);
});

passport.deserializeUser((user, done)=>{
    done(null, user);
});