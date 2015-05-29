(function () {
	"use strict";
	var express = require('express');
	var bodyParser = require('body-parser');

	var cuentas = require('./cuentas.js');

	var app = express();

	var options = {
		extensions: ['htm', 'html'],
		maxAge: '1d',
		setHeaders: function (res, path, stat) {
			res.set('x-timestamp', Date.now())
		}
	};
	app.use(express.static(__dirname + '/static', options));
	// directorio para las plantillas
	app.set('views', __dirname + '/views');
	// usando ejs
	app.set('view engine', 'ejs');
	app.engine('html', require('ejs').renderFile);
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());


	app.use(function (peticion, respuesta, siguiente) {
		console.log("recibida petición: " + peticion.url);
		if (peticion.body) {
			console.log("body: " + JSON.stringify(peticion.body));
		}
		siguiente();
	});

	var router = express.Router();
	app.use(router);
	var root = router.route('/');
	var rootSimple = router.route('/simple');
	var rutaCuentas = router.route('/cuentas/');
	var rutaCuentaId = router.route('/cuentas/:cuentaId');
	var rutaMovimientos = router.route('/cuentas/:cuentaId/movimientos');

	root.get(function (peticion, respuesta) {
		respuesta.send('Hola Express!');
	});
	rootSimple.get(function (peticion, respuesta) {
		respuesta.render('simple',{title:"Soy muy simple"});
	});

	rutaCuentas
		.get(function (peticion, respuesta) {
			respuesta.json(cuentas.selectAll());
		})
		.post(function (peticion, respuesta) {
			respuesta.json(cuentas.insert(peticion.body));
		});

	rutaCuentaId
		.get(function (peticion, respuesta) {
			respuesta.json(cuentas.selectById(peticion.params.cuentaId));
		})
		.put(function (peticion, respuesta) {
			respuesta.json(cuentas.update(peticion.params.cuentaId, peticion.body));
		})
		.delete(function (peticion, respuesta) {
			respuesta.json(cuentas.delete(peticion.params.cuentaId));
		});

	rutaMovimientos
		.get(function (peticion, respuesta) {
			respuesta.json(cuentas.selectMovimientosByCuentaId(peticion.params.cuentaId));
		})
		.post(function (peticion, respuesta) {
			respuesta.json(cuentas.insertMovimiento(peticion.params.cuentaId, peticion.body));
		});

	app.listen(3000);
}());