var express = require('express');
const res = require('express/lib/response');
var passport = require('passport');
var router = express.Router();
var TicketsController = require('../controllers/TicketsController');


//Initial route http://localhost:3000/Ticket

/*
 * GET
 */
router.get('/', TicketsController.list);

/*
 * GET
 */
router.get('/:id', TicketsController.show);

router.get('/login', function(req, res) {
    res.render('login', {user: req.user});
});

/*
 * POST - crear un nueva etiqueta
 */
router.post('/', TicketsController.create);

router.post("/login", TicketsController.auth);

router.post("/:id",TicketsController.verifyJwt,(req,res)=>{
    //Esto tendría el id del usuario en req.user
    //El chiste sería ver si el id existe
    //Y devolver acorde una respuesta, se usaría para la auth
    //en cada vez que se entra a una página
});

/*
 * PUT
 */
router.put('/:id', TicketsController.update);

/*
 * DELETE
 */
router.delete('/:id', TicketsController.remove);

module.exports = router;
