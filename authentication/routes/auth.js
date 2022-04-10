const router = require('express').Router();
const req = require('express/lib/request');
const passport = require('passport');

//cambiar por el archivo .env
const CLIENT_URL = "http://localhost:3000"


router.get("/google", passport.authenticate("google", {scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google", { 
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}));


router.get("/login/success", (req,res)=>{
    if(req.user){
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            cookies: req.cookies
        });
    }
});

router.get("/logout", ()=> {
    req.logout();
    req.redirect(CLIENT_URL);
})
router.get("/login/failed", (req,res)=>{
    res.status(401).json({
        success: false,
        message: "failure"
    });
});

module.exports = router;