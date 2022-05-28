var express = require('express');
const res = require('express/lib/response');
var passport = require('passport');
var router = express.Router();
var UsersController = require('../controllers/UsersController.js');
var UsersModel = require('../models/UsersModel.js');
var RefreshtokensModel = require('../models/refreshTokensModel.js');


//Initial route http://localhost:3002/UsersDB

/*
 * GET
 */
router.get('/', UsersController.list);

/*
 * GET
 */
router.get('/:id', UsersController.show);

router.get('/login', function(req, res) {
    res.render('login', {user: req.user});
});

/*
 * POST - Crear usuario, logear usuario, obtener token de refresco, logout de usuario y autenticación de usuario
 */
router.post('/', UsersController.create);

router.post("/login", UsersController.login);

router.post("/refresh",UsersController.RefreshJwt);

router.post("/logout", UsersController.verifyJwt,UsersController.logout)

router.post("/auth",UsersController.verifyJwt,(req,res)=>{
    //Esto tendría el id del usuario en req.user
    //El chiste sería ver si el id existe
    //Y devolver acorde una respuesta, se usaría para la auth
    //en cada vez que se entra a una página
    const id=req.user.id;
    const email=req.user.email;
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

        RefreshtokensModel.findOne({email:email}, function(err,loggedIn){
            if (err){
                return res.status(500).json({
                    message: 'Error when getting loggedIn user.',
                    error: err
                });
            }

            if (!loggedIn) {
                return res.status(404).json({
                    message: 'No such user is logged in!'
                });
            }

            return res.status(202).json({
                message: "Existe el usuario"
            });


        })

        
    });
});

/*
 * PUT - Se planea usar esto para actualizar un usuario, lo más probable será para el nombre
 */
router.put('/:id', UsersController.update);

/*
 * DELETE - Se planea usar esto para eliminar un usuario.
 */
router.delete('/:id', UsersController.remove);

module.exports = router;
