var UsersModel = require('../models/UsersModel.js');
var jwt=require("jsonwebtoken")
const path = require('path')
require('dotenv').config({path:path.resolve(__dirname,"../config/.env")}); 


const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
      expiresIn: "5s",
    });
  };
  
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};

/**
 * lista de tokes de refrescos, estos se usan para que los
 * usuarios no tengan que enviar multiples veces sin usuario 
 * y contraseña para volver a logear
 * 
 */
 let refreshTokens = [];

 
/**
 * UsersController.js
 *
 * @description :: Server-side logic for managing Userss.
 */
module.exports = {

    /**
     * Crear usuario, se requieren los siguientes datos: 
     * correo, contraseña, nombre y apellido,
     * se coloca automaticamente el plan segun el modelo
     */
     new_user: function (req, res) {
        //desempaquetado de datos iniciales
        const { email, password, firstName, lastName } = req.body;
        //nueva instancia de usuario
        var user = new UsersModel({ email, password, firstName, lastName });
        //guardado de usuario en la base de datos
        const response = user.save();

        //manejo de la respuesta asincrona
        response.then( _ =>
            res.status(201).json("Usuario creado exitosamente")
        )
        .catch(  err => {

            if (err.code === 11000){
                res.status(409).json("Correo ya utilizado")
            }else{
                res.status(500).json("No se pudo crear usuario")
            }
            console.log(err)
        });

    },
    /**
     * UsersController.list()
     */
    list: function (req, res) {
        UsersModel.find({'email':'claus'}, function (err, Userss) {
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

    

    login: function(req, res) {
        //filtro de usuarios
        UsersModel.findOne({'email':req.body.email, 'password': req.body.password},  (err, user) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Users.',
                    error: err
                });
            }
            
            if (user) {
                //Generacion de token de acceso y de refresco
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);
                //guardado de token de refresco
                refreshTokens.push(refreshToken);

                //Informacion provista al frontend (eticket-app)
                res.json({
                    email: user.email,
                    plan: user.plan,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    accessToken,
                    refreshToken
                });
            } else {
                res.status(400).json("Correo o contraseña incorrectos");
            }

        });
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
