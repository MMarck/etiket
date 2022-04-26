var express = require('express');
const res = require('express/lib/response');
var passport = require('passport');
var router = express.Router();
var TicketsController = require('../controllers/LabelsController');
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

/*
 * POST - crear un nueva etiqueta
 */
router.post('/',UsersController.verifyJwt, TicketsController.create);

router.post("/getLabels",UsersController.verifyJwt, TicketsController.list);

/*
 * PUT
 */
router.put('/:id', TicketsController.update);

/*
 * DELETE
 */
router.delete('/:id', TicketsController.remove);

module.exports = router;
