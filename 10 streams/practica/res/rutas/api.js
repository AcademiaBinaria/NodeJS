"use strict";
var fs = require("fs"),
	articulos = require('../articulos');

exports.enrutar = function (router) {
	var ruta = router.route('/api/articulos/');
	ruta
		.get(function (peticion, respuesta) {
			console.log("getting api");
		})
		.post(function (peticion, respuesta) {
			modificarArticulo(peticion.body, respuesta);
		});
}

function modificarArticulo(articuloPeticion, respuesta) {
	var articulo = articulos.porNombre(articuloPeticion.url);
	var unidades = articuloPeticion.unidades;
	if (articulo) {
		articulo.stock = unidades;
		var linea = new Date().toLocaleTimeString() + ";" + JSON.stringify(articulo) + "\n"
		fs.appendFile('pedidos.txt', linea,
			function (err) {
				if (err) return console.log(err);
			});
		respuesta.render('articulo', {
			articulo: articulo
		});
	} else {
		respuesta.render('notfound');
	}
}