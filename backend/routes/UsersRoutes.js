var express = require('express');
var passport = require('passport');
var router = express.Router();
var UsersController = require('../controllers/UsersController.js');

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

router.post("/login", passport.authenticate("local"), function(req,res){
    return res.status(200).send("Ha iniciado sesión")
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
