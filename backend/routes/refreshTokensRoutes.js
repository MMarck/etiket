var express = require('express');
var router = express.Router();
var refreshTokensController = require('../controllers/refreshTokensController.js');

/*
 * GET
 */
router.get('/', refreshTokensController.list);

/*
 * GET
 */
router.get('/:id', refreshTokensController.show);

/*
 * POST
 */
router.post('/', refreshTokensController.create);

/*
 * PUT
 */
router.put('/:id', refreshTokensController.update);

/*
 * DELETE
 */
router.delete('/:id', refreshTokensController.remove);

module.exports = router;
