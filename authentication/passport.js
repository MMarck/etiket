var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
require('dotenv').config(); //libreria para cargar variables de entorno, las cuales estan seteadas en el .env

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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