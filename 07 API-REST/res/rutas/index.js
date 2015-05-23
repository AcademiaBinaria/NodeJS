module.exports = function (app) {
	var express = require('express');
	var router = express.Router();
	app.use(router);
	// a su vez este módulo llama a otros
	require('./root')(router.route('/'));
	require('./articulo')(router.route('/:nombrearticulo'));
};
 


