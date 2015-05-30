"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

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

	app.use(multer({
		dest: './uploads/',
		rename: function (fieldname, filename) {
			return filename.replace(/\W+/g, '-').toLowerCase() +"."+ Date.now()
		}
	}));

	return app;
}

exports.initRouter = function (app) {
	var router = express.Router();
	app.use(router);
	return router;
}