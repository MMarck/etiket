var express = require('express');
const res = require('express/lib/response');
var passport = require('passport');
var router = express.Router();
var TicketsController = require('../controllers/TicketsController');
var UsersController=require("../controllers/UsersController");


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
router.post('/',UsersController.verifyJwt, TicketsController.create);

router.post("/login", TicketsController.auth);

/*
 * PUT
 */
router.put('/:id', TicketsController.update);

/*
 * DELETE
 */
router.delete('/:id', TicketsController.remove);

module.exports = router;
