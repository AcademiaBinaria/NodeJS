"use strict";
var express = require('express');

var app = express();

var options = {
	extensions: ['htm', 'html'],
	maxAge: '1d',
	setHeaders: function (res, path, stat) {
		res.set('x-timestamp', Date.now())
	}
};
// Directorio para contenido estático
app.use(express.static(__dirname + '/static', options));
// Interceptor de llamadas
app.use(function (peticion, respuesta, siguiente) {
	console.log("recibida petición: " + peticion.url);
	siguiente();
});
// Respuesta a una petición concreta
app.get('/', function (peticion, respuesta) {
	respuesta.send('Hola Express!');
});

app.listen(3000);