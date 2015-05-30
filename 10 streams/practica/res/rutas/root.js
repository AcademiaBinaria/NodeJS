"use strict";
var fs = require("fs"),
	articulos = require('../articulos');

exports.enrutar = function (router) {
	var ruta = router.route('/');
	ruta
		.get(function (peticion, respuesta) {
			respuesta.render('lista', {
				articulos: articulos.todos()
			});
		});
}