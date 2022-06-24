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


module.exports = {

    /**
     * TicketsController.list()
     */
    list: function (req, res) {
        const userId=req.body.user
        LabelsModel.find({ user:userId },function (err, labels) {
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
     * LabelsController.show()
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
        var Label = new LabelsModel({
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
                metodo:{"label":"", "value":""},
                unidad:{"label":"", "value":""}
            },
            vidaUtil:{
                valor:"",
                unidad:{"label": "Días", "value": "Días"}
            },
            fabricacion:{
                valor:"",
                unidad:{"label": "Fecha de elaboración", "value": "Fecha de elaboración"}
            },
            caducacion:{
                valor:"",
                unidad:{"label": "Fecha de caducacion", "value": "Fecha de caducacion"}
            },
            direccion: [],
            instrucciones: [],
            lote: "",
            addInfo:[],
            pvp: "",
            posicion:{
                pesos:{
                    x:0,
                    y:0
                },
                nombre:{
                    x:0,
                    y:0
                },
                marca:{
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
                },
                alcohol:{
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
                    "total":{"report":"", "vdr":""},
                    "saturada":{"report":"", "vdr":""},
                    "trans":{"report":"", "vdr":""}
                },
                acidosMono: {"report":"", "vdr":""},
                acidosPoli: {"report":"", "vdr":""},
                colesterol: {"report":"", "vdr":""},
                sodio:{"report":"", "vdr":""},
                carbohidratos: {"report":"", "vdr":""},
                azucares:{"report":"", "vdr":""},
                proteina:{"report":"", "vdr":""},
                fibra:{"report":"", "vdr":""},
                energiaTotal:{"julios":0, "calorias":0}
            }
        });

        LabelsModel.create(Label,function(err,label){
            if (err){
                return res.status(500).json({
                    message: "Error creando Etiqueta",
                    error: err
                })
            }
            
            return res.status(201).json({message: "Etiqueta creada correctamente"});

        });
    },
    
    /**
     * TicketsController.update()
     */
     update: function (req, res) {
        var id = req.params.id;

        LabelsModel.findOne({_id: id, user: req.user.id}, function (err, label) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting label',
                    error: err.json()
                });
            }

            if (!label) {
                return res.status(404).json({
                    message: 'No such label'
                });
            }

            label.country = req.body.country;
			label.nombreProyecto = req.body.nombreProyecto;
            label.tipo = req.body.tipo;
            label.nombreEtiqueta = req.body.nombreEtiqueta;
            label.marca = req.body.marca;
            label.dimensiones = req.body.dimensiones;
            label.pesoNeto = req.body.pesoNeto;
            label.pesoDrenado = req.body.pesoDrenado;
            label.alcohol = req.body.alcohol;
            label.ingredientes = req.body.ingredientes;
            label.alergenos = req.body.alergenos;
            label.conservacion = req.body.conservacion;
            label.vidaUtil = req.body.vidaUtil;
            label.fabricacion = req.body.fabricacion;
            label.caducacion = req.body.caducacion;
            label.lote=req.body.lote;
            label.addInfo=req.body.addInfo;
            label.direccion = req.body.direccion;
            label.instrucciones = req.body.instrucciones;
            label.pvp = req.body.pvp;
            label.posicion = req.body.posicion;
            label.TablaNutri =req.body.TablaNutri;
			
            label.save(function (err, label) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating label.',
                        error: err
                    });
                }

                return res.status(200).json({message: "Se ha guardado correctamente"});
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
    }
};
