"use strict";
var express = require('express');

var app = express();

app.get('/', function (peticion, respuesta) {
	respuesta.send('Hola Express!');
});

app.listen(3000);