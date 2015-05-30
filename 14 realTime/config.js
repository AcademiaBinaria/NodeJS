"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var io = null;
var sockets = [];

var options = {
	extensions: ['htm', 'html'],
	maxAge: '1d',
	setHeaders: function (res, path, stat) {
		res.set('x-timestamp', Date.now())
	}
};

exports.initApp = function () {

	var app = express();
	app.use(express.static(__dirname + '/static', options));

	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	app.use(function (peticion, respuesta, siguiente) {
		console.log("recibida petición: " + peticion.url);
		if (peticion.body) {
			console.log("body: " + JSON.stringify(peticion.body));
		}
		if (peticion.files) {
			console.log(peticion.files)
		}
		siguiente();
	});
	app.use('/api',function(peticion, respuesta, siguiente) {
		
		if (peticion.method !== 'GET') {
			console.log("cambio en los datos: " + peticion.method);
			// broadcast de aviso a conectados...
			if (io) {
				emitirCanalMensaje("dineroMovido", {
					date: new Date()
				});
			}
		}
		siguiente();
	});


	// Configuración de la carga de imágenes
	app.use(multer({
		dest: './uploads/',
		rename: function (fieldname, filename) {
			return filename.replace(/\W+/g, '-').toLowerCase() + "." + Date.now()
		}
	}));

	return app;
}

exports.initRouter = function (app) {
	var router = express.Router();
	app.use(router);
	return router;
}

exports.initIO = function (app) {

	var server = require('http').Server(app);
	io = require('socket.io')(server);
	io.on("connect", conectar);
	return server;
}

function conectar(socket) {
	console.log("Conectando con: " + socket.client.conn.remoteAddress);
	sockets.push(socket);
	var saludo = {
		serverPid: process.pid,
		date: new Date()
	};
	socket.emit('wellcome', saludo);
	console.log("Enviado saludo " + JSON.stringify(saludo));
}

function emitirCanalMensaje(canal, mensaje) {
	console.log(new Date().toLocaleTimeString() + " " + canal + " : " + mensaje);
	sockets.forEach(function (socket) {
		socket.emit(canal, mensaje);
	});
}