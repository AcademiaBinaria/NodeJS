"use strict";
var express = require('express');
var bodyParser = require('body-parser');

var cuentas = require('./cuentas.js');

var app = express();

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
// Enrutador
var root = router.route('/');
var rutaCuentas = router.route('/cuentas/');
var rutaCuentaId = router.route('/cuentas/:cuentaId');
var rutaMovimientos = router.route('/cuentas/:cuentaId/movimientos');



// Respondemos a esas rutas con funciones
// Primer paso hacia la organización
root.get(function (peticion, respuesta) {
	respuesta.send('Hola Express!');
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