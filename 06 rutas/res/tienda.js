"use strict";
var express = require('express'),
	articulos = require('./articulos.js'),
	escritor = require('./escritor.js');

var titulo = "Mi tienda";

var app = express();

app.get('/', homePage);

app.get('/:nombrearticulo', paginaArticulo);

function homePage(peticion, respuesta) {
	var html = escritor.cabecera("Tienda");
	html += "<h1>Lista jardcodeada</h1><p>Mi lista de productos<p> ;-)";
	html += escritor.lista(articulos.todos());
	html += escritor.cierre();
	escritor.enviar(respuesta, 200, html);
}

function paginaArticulo(peticion, respuesta) {
	var nombreArticulo = peticion.params.nombrearticulo;
	var articulo = articulos.porNombre(nombreArticulo);
	if (articulo) {
		var html = escritor.cabecera(articulo.nombre);
		html += escritor.articulo(articulo);
		html += escritor.cierre();
		escritor.enviar(respuesta, 200, html);
	} else {
		console.log("no encuentro: " + nombreArticulo);
		var html = escritor.cabecera("no encuentro: " + nombreArticulo);
		html += '<h1>404</h1> Nada por aquí'
		escritor.enviar(respuesta, 404, html);
	}
}


app.listen(3000);