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
            user: req.user.id,
			nameProyecto : req.body.nameProyecto,
            tipo: req.body.tipo,
            nombreEtiqueta: req.body.nombreEtiqueta,
            marca: req.body.marca,
            dimensiones: {
                ancho:req.body.dimensiones.ancho,
                altura:req.body.dimensiones.altura,
                unidad:req.body.dimensiones.unidad,
                sizeIndicatorVisibility:req.body.dimensiones.sizeIndicatorVisibility
            },
            pesoNeto:{
                valor:req.body.pesoNeto.valor,
                label:req.body.pesoNeto.label,
                unidad:req.body.pesoNeto.unidad
            },
            pesoDrenado:{
                valor:req.body.pesoDrenado.valor,
                label:req.body.pesoDrenado.label,
                unidad:req.body.pesoDrenado.unidad,
                isDisabled:req.body.pesoDrenado.isDisabled
            },
            alcohol:{
                valor:req.body.alcohol.valor,
                unidad:req.body.alcohol.unidad
            },
            ingredientes:req.body.ingredientes,
            alergenos:req.body.alergenos,
            conservacion:{
                metodo:req.body.conservacion.metodo,
                unidad:req.body.conservacion.unidad
            },
            vidaUtil:{
                valor:req.body.vidaUtil.metodo,
                unidad:req.body.vidaUtil.unidad
            },
            fabricacion:{
                valor:req.body.fabricacion.metodo,
                unidad:req.body.fabricacion.unidad
            },
            caducacion:{
                valor:req.body.caducacion.metodo,
                unidad:req.body.caducacion.unidad
            },
            direccion: req.body.direccion,
            instrucciones: req.body.instrucciones,
            posicion:{
                pesos:{
                    x:req.body.posicion.pesos.x,
                    y:req.body.posicion.pesos.y
                },
                nombre:{
                    x:req.body.posicion.nombre.x,
                    y:req.body.posicion.nombre.y
                },
                ingredientes:{
                    x:req.body.posicion.ingredientes.x,
                    y:req.body.posicion.ingredientes.y
                },
                alergenos:{
                    x:req.body.posicion.alergenos.x,
                    y:req.body.posicion.alergenos.y
                },
                infNut:{
                    x:req.body.posicion.infNut.x,
                    y:req.body.posicion.infNut.y
                }
            },
            TablaNutri:{
                tipo: req.body.TablaNutri.tipo,
                tamanioPorcion: req.body.TablaNutri.tamanioPorcion,
                porcionPorEnvase: req.body.TablaNutri.porcionPorEnvase,
                grasas: req.body.TablaNutri.grasas,
                acidosPoli: req.body.TablaNutri.acidosPoli,
                colesterol: req.body.TablaNutri.colesterol,
                sodio:req.body.TablaNutri.sodio,
                carbohidratos: req.body.TablaNutri.carbohidratos,
                azucares:req.body.TablaNutri.azucares,
                proteinas:req.body.TablaNutri.proteinas,
                fibra:req.body.TablaNutri.fibra,
                energiaTotal:req.body.TablaNutri.energiaTotal
            }
        });

        TicketsModel.create(Ticket,function(err,ticket){
            if (err){
                return res.status(500).json({
                    message: "Error creando Etiqueta",
                    error: err
                })
            }
            
            return res.status(201).json(ticket);

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
