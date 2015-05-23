"use strict";
var express = require('express');
// Paquete externo para... parsear el body :-)
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

app.get('/', function (peticion, respuesta) {
	respuesta.send('Hola Express!');
});

app.get('/cuentas', function (peticion, respuesta) {
	respuesta.json(cuentas.selectAll());
});

app.get('/cuentas/:cuentaId', function (peticion, respuesta) {
	respuesta.json(cuentas.selectById(peticion.params.cuentaId));
});

app.post('/cuentas/', function (peticion, respuesta) {
	respuesta.json(cuentas.insert(peticion.body));
});

app.put('/cuentas/:cuentaId', function (peticion, respuesta) {
	respuesta.json(cuentas.update(peticion.params.cuentaId, peticion.body));
});

app.delete('/cuentas/:cuentaId', function (peticion, respuesta) {
	respuesta.json(cuentas.delete(peticion.params.cuentaId));
});


app.listen(3000);