var express = require('express');
const res = require('express/lib/response');
var passport = require('passport');
var router = express.Router();
var UsersController = require('../controllers/UsersController.js');


//Initial route http://localhost:3000/UsersDB

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
 * POST
 */
router.post('/', UsersController.create);

router.post("/login", UsersController.login);

router.post("/:id",UsersController.verifyJwt,(req,res)=>{
    //Esto tendría el id del usuario en req.user
    //El chiste sería ver si el id existe
    //Y devolver acorde una respuesta, se usaría para la auth
    //en cada vez que se entra a una página
});

/*
 * PUT
 */
router.put('/:id', UsersController.update);

/*
 * DELETE
 */
router.delete('/:id', UsersController.remove);

module.exports = router;
