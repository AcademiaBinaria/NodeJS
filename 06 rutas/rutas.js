"use strict";
var express = require('express');

var app = express();

// esta función sigue siendo para todos
app.use(function (peticion, respuesta, siguiente) {
	console.log("recibida petición: " + peticion.url);
	siguiente();
});
// la ruta base
app.get('/', function (peticion, respuesta) {
	respuesta.send('Hola Express!');
});
// Cada ruta tienes su función
app.get('/about', function (peticion, respuesta) {
	respuesta.send('Página creada por gente que sabe Express!');
});

app.listen(3000);