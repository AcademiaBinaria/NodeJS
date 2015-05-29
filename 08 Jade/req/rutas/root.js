(function () {
	"use strict";
	var escritor = require('../escritor'),
		articulos = require('../articulos');
	// Este es el módulo de la home page
	var handler = function (router) {
		router.get(function (peticion, respuesta) {
			var html = escritor.cabecera("Tienda");
			html += "<h1>Lista jardcodeada</h1><p>Mi lista de productos<p> ;-)";
			html += escritor.lista(articulos.todos());
			html += escritor.cierre();
			escritor.enviar(respuesta, 200, html);
		});
	}

	module.exports = handler;
}());