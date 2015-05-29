(function () {
	"use strict";
	var express = require('express'),
		bodyParser = require('body-parser');

	var titulo = "Mi tienda";

	var app = express();
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	
	// las rutas están en otro módulo
	require('./rutas/index.js')(app);
	
	app.listen(3000);

}());