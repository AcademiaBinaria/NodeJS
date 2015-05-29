module.exports = function (app) {
	var express = require('express');
	var router = express.Router();
	app.use(router);
	require('./root')(router.route('/'));
	require('./articulo')(router.route('/:nombrearticulo'));
};
 


