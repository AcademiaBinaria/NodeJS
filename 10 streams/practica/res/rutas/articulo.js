"use strict";
var fs = require("fs"),
	articulos = require('../articulos');

exports.enrutar = function (router) {
	var ruta = router.route('/articulo/:nombrearticulo');
	ruta
		.get(function (peticion, respuesta) {
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