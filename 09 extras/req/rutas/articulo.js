(function () {
	"use strict";
	var express = require('express'),
		articulos = require('../articulos');

	var handler = function (router) {
		router.get(function (peticion, respuesta) {
			var nombreArticulo = peticion.params.nombrearticulo;
			var articulo = articulos.porNombre(nombreArticulo);
			if (articulo) {
				respuesta.render('articulo', {
					articulo: articulo
				});
			} else {
				respuesta.render('notfound');
			}
		});

	}

	module.exports = handler;
}());