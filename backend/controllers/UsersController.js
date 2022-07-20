var passport = require('passport');
var UsersModel = require('../models/UsersModel.js');
var RefreshModel= require("../models/refreshTokensModel.js")
var jwt=require("jsonwebtoken")
const path = require('path')
const crypto= require('crypto')
const {getTemplate, sendEmail} =require('../config/mail.config');
require('dotenv').config({path:path.resolve(__dirname,"../config/.env")}); 




const generateAccessToken = (user)=>{
    const accessToken=jwt.sign(
        { 
            id:user.id,
            email: user.email
        }, 
        process.env.JWT_SECRET,
        {expiresIn:"30m"}
    );
    return accessToken;
}

const generateRefreshToken = (user)=>{
    const refreshToken=jwt.sign(
        { 
            id:user.id,
            email: user.email
        }, 
        process.env.JWT_REFRESH_SECRET,
    );
    return refreshToken;
}

/**
 * UsersController.js
 *
 * @description :: Server-side logic for managing Userss.
 */
module.exports = {

    /**
     * UsersController.list()
     */
    list: function (req, res) {
        UsersModel.find(function (err, Userss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Users.',
                    error: err
                });
            }

            return res.json(Userss);
        });
    },

    /**
     * UsersController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UsersModel.findOne({_id: id}, function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Users.',
                    error: err
                });
            }

            if (!Users) {
                return res.status(404).json({
                    message: 'No such Users'
                });
            }

            return res.json(Users);
        });
    },

    /**
     * UsersController.create()
     */
    create: function (req, res) {
        var Users = new UsersModel({
			email : req.body.email,
			firstName : req.body.firstName,
            lastName : req.body.lastName,
            emailToken: jwt.sign(
                { 
                    email: req.body.email
                }, 
                'secretKey',
                {expiresIn:'48h'}
            ),
            isVerified: false
        });
        UsersModel.register(Users,req.body.password,function(err,user){
            if (err){
                return res.status(404).json({
                    message: "Error creando usuario",
                    error: err
                })
            }
            passport.authenticate("local")(req,res,function(){
                const template= getTemplate(Users.firstName +" "+Users.lastName,Users._id,req.headers.host, Users.emailToken)
                sendEmail(Users.email, "Verification Account",template);
                return res.status(201).json({
                    message: "Se ha creado el usuario correctamente"
                    
                });

            })

        });



    },

    login: function(req, res, next) {
        /* look at the 2nd parameter to the below call */
        passport.authenticate('local', function(err, user, info) {
          if (err) { return next(err); }
          if (!user) { return res.status(400).json({message:"Error, correo o contraseña no son correctos"}); }
          if(user.isVerified==false){ return res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });}
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            const accessToken=generateAccessToken(req.user)
            const refreshToken=generateRefreshToken(req.user)

            var refreshTokens = new RefreshModel({
                email: req.body.email,
                token : refreshToken
            });
        
            refreshTokens.save(function (err) {
                if (err) {
                    return res.status(400).json({
                        message:"Error al guardar refresh token",
                        error:err})
                }
            });

            return res.status(202).json({accessToken:accessToken, refreshToken: refreshToken})
            
          });
          
        })(req, res, next);
    },

    verify:function(req,res){
        console.log("verificando...")
        try{
            const token=req.params.token
            UsersModel.findOne({emailToken:token}, function (err, Users) {
                if (err) {
                    return res.status(500).json({
                        message: 'Email is not verified',
                        error: err.json()
                    });
                }
                if (!Users) {
                    return res.status(201).json({
                        message: 'Email is verified'
                    });
                }
                
                Users.emailToken=null
                Users.isVerified=true
                Users.save(function (err, Users) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when updating Users.',
                            error: err
                        });
                    }
                    
                    res.redirect('http://localhost:3000/login/confirmationAccount') //de momento nomas :,v
                });
            });

        }catch(err){
            console.log(err)
        }
    },

    RefreshJwt: function(req,res){
        const refreshToken=req.body.refreshToken;

        if(!refreshToken) return res.status(401).json("¡No estás autenticado!")
        RefreshModel.findOne({token: refreshToken}, function (err, refreshTokens) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting refreshTokens.',
                    error: err
                });
            }

            if (!refreshTokens) {
                return res.status(404).json({
                    message: '¡Resfresh Token no es válido!'
                });
            }

            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err,user)=>{
                if (err){
                    return res.status(403).json("Token is not valid");
                }
                RefreshModel.findOneAndRemove({token:refreshToken}, function (err) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when deleting the refreshToken.',
                            error: err
                        });
                    }
                });
                const newAccessToken=generateAccessToken(user);
                const newRefreshToken=generateRefreshToken(user);

                var refreshTokenModel = new RefreshModel({
                    token : newRefreshToken,
                    email: user.email
                });

                refreshTokenModel.save(function (err) {
                    if (err) {
                        return res.status(400).json({
                            message:"Error al guardar refresh token",
                            error:err})
                    }
                });

                return res.status(200).json({
                    accessToken: newAccessToken, refreshToken: newRefreshToken
                })

            })
        });
        
    },

    verifyJwt: function(req,res,next){
        const authHeader=req.headers.authorization.split(" ")[1];
        if (authHeader){
            jwt.verify(authHeader,process.env.JWT_SECRET, (err, user)=>{
                if (err){
                    return res.status(403).json("Token is not valid");
                }
                req.user=user;
                next();
            })
        } else {
            res.status(401).json("You are not authenticated!")
        }
    },

    logout: function(req,res){
        const refreshToken= req.body.refreshToken;
        if (refreshToken){
            jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET,(err,user)=>{
                if (err){
                    return res.status(403).json("Token is not valid");
                }
                RefreshModel.findOneAndRemove({token:refreshToken, email:user.email}, function (err, token) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when deleting the refreshToken.',
                            error: err
                        });
                    }
                    if (!token){
                        return res.status(404).json({
                            message: "No ha iniciado sesión nunca."
                        })
                    }
                    return res.status(200).json({message:"Se cerró la sesión correctamente."})
                });
            })
        } else{
            return res.status(401).json("¡Nunca has iniciado sesión!")
        }
        
       
    },

    /**
     * UsersController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UsersModel.findOne({_id: id}, function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Users',
                    error: err.json()
                });
            }

            if (!Users) {
                return res.status(404).json({
                    message: 'No such Users'
                });
            }

            Users.userId = req.body.userId ? req.body.userId : Users.userId;
			Users.username = req.body.username ? req.body.username : Users.username;
			Users.password = req.body.password ? req.body.password : Users.password;
			Users.email = req.body.email ? req.body.email : Users.email;
			Users.nombre = req.body.nombre ? req.body.nombre : Users.nombre;
			
            Users.save(function (err, Users) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Users.',
                        error: err
                    });
                }

                return res.json(Users);
            });
        });
    },

    /**
     * UsersController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UsersModel.findByIdAndRemove(id, function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Users.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
