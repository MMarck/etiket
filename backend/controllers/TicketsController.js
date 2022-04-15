var passport = require('passport');
var TicketsModel = require('../models/TicketsModel');
var jwt = require("jsonwebtoken");
const path = require('path');
require('dotenv').config({path:path.resolve(__dirname,"../config/.env")}); 

/**
 * TicketsController.js
 *
 * @description :: Logica del lado del servidor para el manejo de etiquetas
 */
module.exports = {

    /**
     * TicketsController.list()
     */
    list: function (req, res) {
        TicketsModel.find(function (err, tickets) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Tickets.',
                    error: err
                });
            }

            return res.json(tickets);
        });
    },

    /**
     * TicketsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        TicketsModel.findOne({_id: id}, function (err, Ticket) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Tickets.',
                    error: err
                });
            }

            if (!Ticket) {
                return res.status(404).json({
                    message: 'No such Ticket'
                });
            }

            return res.json(Ticket);
        });
    },

    /**
     * TicketsController.create()
     */
    create: function (req, res) {
        var Ticket = new TicketsModel({
			name : req.body.name,
            type: req.body.type
        });

        TicketsModel.create(Ticket,function(err,user){
            if (err){
                return res.status(500).json({
                    message: "Error creando Etiqueta",
                    error: err
                })
            }
            
            passport.authenticate("local")(req,res,function(){
                return res.status(201).json();
            })

        });
    },

    
    /**
     * TicketsController.update()
     */
     update: function (req, res) {
        var id = req.params.id;

        TicketsModel.findOne({_id: id}, function (err, Ticket) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Ticket',
                    error: err.json()
                });
            }

            if (!Ticket) {
                return res.status(404).json({
                    message: 'No such Ticket'
                });
            }

            Ticket.userId = req.body.userId ? req.body.userId : Users.userId;
			Ticket.name = req.body.name ? req.body.name : Users.name;
			Ticket.type = req.body.type ? req.body.type : Users.type;
			
            Ticket.save(function (err, Ticket) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Ticket.',
                        error: err
                    });
                }

                return res.json(Ticket);
            });
        });
    },

    /**
     * TicketsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        TicketsModel.findByIdAndRemove(id, function (err, Ticket) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Users.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    auth: function(req, res, next) {
        /* look at the 2nd parameter to the below call */
        passport.authenticate('local', function(err, user, info) {
            if (err) { 
                return next(err); 
            }
            if (!user) { 
                return res.status(400).json({message:"Error, correo o contraseña no son correctos"}); 
            }
            req.logIn(user, function(err) {
                    if (err) { 
                        return next(err); 
                    }
                    const accessToken=jwt.sign({id:req.user._id}, process.env.JWT_SECRET);
                    return res.status(202).json({message:"correcto", user:accessToken})
                }
            );
        })(req, res, next);
    },

    verifyJwt: function(req,res,next){
        const authHeader=req.headers.authorization;
        if (authHeader){
            jwt.verify(authHeader,process.env.JWT_SECRET, (err, userId)=>{
                if (err){
                    return res.status(403).json("Token is not valid");
                }
                req.user=userId;
                next();
            })
        } else {
            res.status(401).json("You are not authenticated!")
        }
    },

};
