var express = require('express');
const res = require('express/lib/response');
var passport = require('passport');
var router = express.Router();
var LabelsController = require('../controllers/LabelsController');
var UsersController=require("../controllers/UsersController");


//Initial route http://localhost:3000/Ticket

/*
 * GET
 */
router.get('/', LabelsController.list);

/*
 * GET
 */
router.get('/:id', LabelsController.show);

/*
 * POST - crear un nueva etiqueta
 */
router.post('/',UsersController.verifyJwt, LabelsController.create);

router.post("/getLabels",UsersController.verifyJwt, LabelsController.list);

router.post("/getLabelbyId",UsersController.verifyJwt, LabelsController.show);

/*
 * PUT
 */
router.put('/:id', UsersController.verifyJwt, LabelsController.update);

/*
 * DELETE
 */
router.delete('/:id', UsersController.verifyJwt, LabelsController.remove);

module.exports = router;
