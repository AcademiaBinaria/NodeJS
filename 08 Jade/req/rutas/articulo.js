(function () {
	"use strict";
	var express = require('express'),
		escritor = require('../escritor'),
		articulos = require('../articulos');
	
	// Este es el módulo para la página de un artículo
	var handler = function (router) {
		router.get(function (peticion, respuesta) {
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
		});

	}

	module.exports = handler;
}());