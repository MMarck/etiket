var RefreshtokensModel = require('../models/refreshTokensModel.js');

/**
 * refreshTokensController.js
 *
 * @description :: Server-side logic for managing refreshTokenss.
 */
module.exports = {

    /**
     * refreshTokensController.list()
     */
    list: function (req, res) {
        RefreshtokensModel.find(function (err, refreshTokenss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting refreshTokens.',
                    error: err
                });
            }

            return res.json(refreshTokenss);
        });
    },

    /**
     * refreshTokensController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        RefreshtokensModel.findOne({_id: id}, function (err, refreshTokens) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting refreshTokens.',
                    error: err
                });
            }

            if (!refreshTokens) {
                return res.status(404).json({
                    message: 'No such refreshTokens'
                });
            }

            return res.json(refreshTokens);
        });
    },

    /**
     * refreshTokensController.create()
     */
    create: function (req, res) {
        var refreshTokens = new RefreshtokensModel({
			token : req.body.token
        });

        refreshTokens.save(function (err, refreshToken) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating refreshTokens',
                    error: err
                });
            }

            return res.status(201).json(refreshToken);
        });
    },

    /**
     * refreshTokensController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        RefreshtokensModel.findOne({_id: id}, function (err, refreshTokens) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting refreshTokens',
                    error: err
                });
            }

            if (!refreshTokens) {
                return res.status(404).json({
                    message: 'No such refreshTokens'
                });
            }

            refreshTokens.refreshToken = req.body.refreshToken ? req.body.refreshToken : refreshTokens.refreshToken;
			
            refreshTokens.save(function (err, refreshTokens) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating refreshTokens.',
                        error: err
                    });
                }

                return res.json(refreshTokens);
            });
        });
    },

    /**
     * refreshTokensController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        RefreshtokensModel.findOneAndRemove({token:resfreshToken}, function (err) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the refreshToken.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
