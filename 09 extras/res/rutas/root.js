(function () {
	"use strict";
	var articulos = require('../articulos');

	var handler = function (router) {
		router.get(function (peticion, respuesta) {
			respuesta.render('lista',{articulos:articulos.todos()});
		});
	}

	module.exports = handler;
}());