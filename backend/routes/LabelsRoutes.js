var express = require('express');
var router = express.Router();
var LabelsController = require('../controllers/LabelsController');
var UsersController=require("../controllers/UsersController");


//Initial route http://localhost:3000/Ticket


/*
 * POST - crear un nueva etiqueta, obtener información de una etiqueta por id o obtener todas las etiquetas de un usuario
 */
router.post('/',UsersController.verifyJwt, LabelsController.create);

router.post("/getLabels",UsersController.verifyJwt, LabelsController.list);

router.post("/getLabelbyId",UsersController.verifyJwt, LabelsController.show);

/*
 * PUT - Esto es para actualizar o guardar cambios de una etiqueta
 */
router.put('/:id', UsersController.verifyJwt, LabelsController.update);

/*
 * DELETE
 */
router.delete('/:id', UsersController.verifyJwt, LabelsController.remove);

module.exports = router;
