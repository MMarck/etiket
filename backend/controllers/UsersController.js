var passport = require('passport');
var UsersModel = require('../models/UsersModel.js');

/**
 * UsersController.js
 *
 * @description :: Server-side logic for managing Userss.
 */
module.exports = {

    /**
     * UsersController.list()
     */
    list: function (req, res) {
        UsersModel.find(function (err, Userss) {
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

    /**
     * UsersController.create()
     */
    create: function (req, res) {
        var Users = new UsersModel({
			email : req.body.email,
			nombre : req.body.nombre
        });

        UsersModel.register(Users,req.body.password,function(err,user){
            if (err){
                return res.status(500).json({
                    message: "Error creando usuario",
                    error: err
                })
            }
            
            passport.authenticate("local")(req,res,function(){
                return res.status(204).json();
            })

        });
    },

    auth: function(req,res){
        
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
                    error: err
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
