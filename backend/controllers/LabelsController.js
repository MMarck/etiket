var passport = require('passport');
var LabelsModel = require('../models/LabelsModel');
var jwt = require("jsonwebtoken");
const path = require('path');
require('dotenv').config({path:path.resolve(__dirname,"../config/.env")}); 

/**
 * TicketsController.js
 *
 * @description :: Logica del lado del servidor para el manejo de etiquetas
 */

 function handleDateChange(value){

    const yyyy = value.getFullYear();
    let mm = value.getMonth() + 1; 
    let dd = value.getDate();
  
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
  
    const date = dd + '/' + mm + '/' + yyyy
    return date
}

module.exports = {

    /**
     * TicketsController.list()
     */
    list: function (req, res) {
        const userId=req.body.user
        LabelsModel.find({user:userId},function (err, labels) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Tickets.',
                    error: err
                });
            }

            if (!labels){
                return res.json([])
            }
            const resJson=[]
            labels.forEach(i => {
                let json={
                    nombreProyecto: i.nombreProyecto,
                    tipo: i.tipo,
                    id: i._id
                }
                resJson.push(json)
            });

            return res.json(resJson);
        });
    },

    /**
     * TicketsController.show()
     */
    show: function (req, res) {
        const labelId = req.body.labelId;
        const userId=req.user.id;

        LabelsModel.findOne({_id: labelId, user:userId}, function (err, label) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting labels.',
                    error: err
                });
            }

            if (!label) {
                return res.status(404).json({
                    message: 'No such label'
                });
            }

            return res.json(label);
        });
    },

    /**
     * TicketsController.create()
     */
    create: function (req, res) {
        var Ticket = new LabelsModel({
            user: req.user.id,
            country: req.body.country,
			nombreProyecto : req.body.nombreProyecto,
            tipo: req.body.tipo,
            nombreEtiqueta: "",
            marca:"",
            dimensiones: {
                ancho:"10",
                altura:"10",
                unidad:{"label":"Centímetros","value":"cm"},
                sizeIndicatorVisibility:"hidden"
            },
            pesoNeto:{
                valor:"",
                label:{"label":"Contenido neto", "value": "Contenido neto"},
                unidad:{"label":"g", "value":"g"}
            },
            pesoDrenado:{
                valor:"",
                label:{"label":"Contenido drenado", "value": "Contenido drenado"},
                unidad:{"label":"g", "value":"g"},
                isDisabled:"true"
            },
            alcohol:{
                valor:"",
                unidad:{"value":"Alcohol __% (Vol.)", "label":"Alcohol __% (Vol.)"}
            },
            ingredientes:[],
            alergenos:[],
            conservacion:{
                metodo:{"label":"En refrigeración", "value":"En refrigeración"},
                unidad:{"label":"Mantener", "value":"Mantener"}
            },
            vidaUtil:{
                valor:"",
                unidad:{"label": "Días", "value": "Días"}
            },
            fabricacion:{
                valor:handleDateChange(new Date()),
                unidad:{"label": "Fecha de elaboración", "value": "Fecha de elaboración"}
            },
            caducacion:{
                valor:handleDateChange(new Date()),
                unidad:{"label": "Fecha de caducacion", "value": "Fecha de caducacion"}
            },
            direccion: "",
            instrucciones: "",
            posicion:{
                pesos:{
                    x:0,
                    y:0
                },
                nombre:{
                    x:0,
                    y:0
                },
                ingredientes:{
                    x:0,
                    y:0
                },
                alergenos:{
                    x:0,
                    y:0
                },
                infNut:{
                    x:0,
                    y:0
                }
            },
            TablaNutri:{
                tipo: {"label":"Formato estándar", "value":"Formato estándar"},
                tamanioPorcion: {
                    "valor":0,
                    "unidad":{"label":"mg", "value":"mg"}
                },
                porcionPorEnvase: {
                    "valor":0,
                    "unidad":{"label":"aprox.", "value":"aprox."},
                    "porcionPorEnvaseDisabled":"true"
                },
                grasas: {
                    "total":0,
                    "saturada":0,
                    "trans":0
                },
                acidosPoli: 0,
                colesterol: 0,
                sodio:0,
                carbohidratos: 0,
                azucares:0,
                proteinas:0,
                fibra:0,
                energiaTotal:0
            }
        });

        LabelsModel.create(Ticket,function(err,ticket){
            if (err){
                return res.status(500).json({
                    message: "Error creando Etiqueta",
                    error: err
                })
            }
            
            return res.status(201).json({message: "Etiqueta creada correctamente"});

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

        LabelsModel.findOne({_id: id}, function (err, Ticket) {
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

        LabelsModel.findByIdAndRemove(id, function (err, Ticket) {
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
    }

};
