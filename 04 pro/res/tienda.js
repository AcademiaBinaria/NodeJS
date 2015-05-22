"use strict";
var http = require('http'),
	url = require('url'),
	articulos = require('./articulos.js'),
	escritor = require('./escritor.js');


var titulo = "Mi tienda";

http.createServer(tiendaServer).listen(3000);

function tiendaServer(req, res) {
	var uri = url.parse(req.url).pathname;
	if (uri === "/favicon.ico") return;
	console.log('me piden... ' + uri);
	if (uri === "/") {
		homePage(res);
	} else {
		console.log('busco en el array... ' + uri);
		var articulo = articulos.porNombre(uri);
		if (articulo) {
			console.log("encontrado: " + JSON.stringify(articulo));
			paginaArticulo(res, articulo);
		} else {
			console.log("no encuentro: " + uri);
			notFound(res, uri);
		}
	}
}

function homePage(res) {
	escritor.cabecera(res, 200, "tienda");
	res.write("<body>");
	res.write("<h1>Lista jardcodeada</h1><p>Mi lista de productos<p> ;-)");
	escritor.lista(res, articulos.todos());
	escritor.cierre(res);
}

function paginaArticulo(res, articulo) {
	escritor.cabecera(res, 200, articulo.nombre);
	res.write("<body>");
	escritor.articulo(res, articulo);
	escritor.cierre(res);
}

function notFound(res, uri) {
	escritor.cabecera(res, 404, uri);
	res.write("<body>");
	res.write('<h1>404</h1> Nada por aquí');
	escritor.cierre(res);
}