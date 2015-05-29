"use strict";
var express = require('express');
var bodyParser = require('body-parser');
// Morgan es un paquete para crear logs
var morgan = require('morgan');
var fs = require('fs');


var options = {
	extensions: ['htm', 'html'],
	maxAge: '1d',
	setHeaders: function (res, path, stat) {
		res.set('x-timestamp', Date.now())
	}
};

exports.initApp = function () {

	var app = express();
	
	// Configuración de morgan
	
	app.use(morgan('combined'));
//	var fileLog = fs.createWriteStream(__dirname + '/tienda.log', {
//	flags: 'a'
//})
//app.use(morgan('combined', {stream: fileLog
//	}));

	app.use(express.static(__dirname + '/static', options));

	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	app.use(function (peticion, respuesta, siguiente) {
		if (peticion.body) {
			console.log("body: " + JSON.stringify(peticion.body));
		}
		siguiente();
	});

	app.use(function (error, peticion, respuesta, siguiente) {
		console.error(error.stack);
		respuesta.status(500).send('Jiuston, tenemos un povlema!');
	});


	return app;
}

exports.initRouter = function (app) {
	var router = express.Router();
	app.use(router);
	return router;
}