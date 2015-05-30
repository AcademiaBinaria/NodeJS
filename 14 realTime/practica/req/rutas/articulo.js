"use strict";
var fs = require("fs"),
	articulos = require('../articulos');

exports.enrutar = function (router) {
	var ruta = router.route('/articulo/:nombrearticulo');
	ruta
		.get(function (peticion, respuesta) {
			articulos.porNombre(peticion.params.nombrearticulo)
				.then(function (articulo) {
					if (articulo) {
						respuesta.render('articulo', {
							articulo: articulo
						});
					} else {
						respuesta.render('notfound');
					}
				});

		});
}