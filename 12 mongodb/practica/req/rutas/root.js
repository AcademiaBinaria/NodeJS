(function () {
	"use strict";
	var articulos = require('../articulos');

	var handler = function (router) {
		router.get(function (peticion, respuesta) {
			articulos.todos().
			then(function (result) {
				respuesta.render('lista', {
					articulos: result
				});
			})

		});
	}

	module.exports = handler;
}());