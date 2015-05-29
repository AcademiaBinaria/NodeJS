"use strict";
var express = require('express');

var app = express();

app.get('/', function (peticion, respuesta) {
	respuesta.send('Hola Express nodemon!');
});

app.listen(3000);