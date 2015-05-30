"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var seguridadData = require('./data/seguridadData.js');

module.exports.configApp = function () {

	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(express.static(__dirname + './../client'));
	console.log("bodyParser y servidor de ficheros estáticos en uso");


	app.use('/api/priv/', function (req, res, next) {
		var sessionId = req.get('sessionId');
		var sesion = seguridadData.getSesion(sessionId);
		if (sesion) {
			if (sesion.timeStamp) {
				req.usuario = sesion.email;
				next();
			} else {
				res.status(419).send('Sesión caducada');
			}
		} else {
			res.status(401).send('Credencial inválida');
		}
	});

	app.use(function (peticion, respuesta, siguiente) {
		console.log("recibida petición: " + peticion.url);
		if (peticion.body && Object.keys(peticion.body).length > 0) {
			console.log("body: " + JSON.stringify(peticion.body));
		}
		siguiente();
	});

	return app;
}
