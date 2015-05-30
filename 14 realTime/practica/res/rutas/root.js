"use strict";
var fs = require("fs"),
	articulos = require('../articulos');

exports.enrutar = function (router) {
	var ruta = router.route('/');
	ruta
		.get(function (peticion, respuesta) {
			articulos.todos().
			then(function (result) {
				respuesta.render('lista', {
					articulos: result
				});
			})
		});

}