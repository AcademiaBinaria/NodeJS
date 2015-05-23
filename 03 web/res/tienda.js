"use strict";
var http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs');

var mimeTypes = {
	"html": "text/html",
	"png": "image/png",
	"js": "text/javascript",
	"css": "text/css"
};
var articulos = [
	{
		url: "atun-calvo",
		nombre: 'Atún Calvo',
		precio: 1.20,
		stock: 24
	}, {
		url: "bonilla-a-la-vista",
		nombre: 'Bonilla a la vista',
		precio: 0.60,
		stock: 0
	}, {
		url: "estrella-galicia",
		nombre: 'Estrella Galicia',
		precio: 1.10,
		stock: 36
	}, {
		url: "cabreiroa",
		nombre: 'Cabreiroá',
		precio: 0.90,
		stock: 12
	}, {
		url: "barritas-pescanova",
		nombre: 'Barritas Pescanova',
		precio: 3.50,
		stock: 0
	}];

var titulo = "Mi tienda";

http.createServer(tiendaServer).listen(3000);

function tiendaServer(req, res) {
	var uri = url.parse(req.url).pathname;
	if (uri === "/favicon.ico") return;
	console.log('me piden... ' + uri);
	if (uri === "/") {
		homePage(res);
	} else {
		console.log('busco en el array... ' + uri);
		var articulo = buscarArticulo(uri);
		if (articulo) {
			console.log("encontrado: " + JSON.stringify(articulo));
			paginaArticulo(res, articulo);
		} else {
			console.log("no encuentro: " + uri);
			notFound(res);
		}
	}
}

function homePage(res) {
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.write("<html>");
	res.write("<head>");
	res.write("<meta charset='utf-8'>");
	res.write("<title>" + titulo + "</title>");
	res.write("</head>");
	res.write("<body>");
	res.write("<h1>Lista jardcodeada</h1><p>Mi lista de productos<p> ;-)");
	res.write(montarLista());
	res.write("</body>");
	res.write("</html>");
	res.end();
}

function paginaArticulo(res, articulo) {
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.write("<html>");
	res.write("<head>");
	res.write("<meta charset='utf-8'>");
	res.write("<title>" + articulo.nombre + "</title>");
	res.write("</head>");
	res.write("<body>");
	res.write("<h1>" + articulo.nombre + "</h1>");
	res.write("<h2> Precio especial: " + articulo.precio + " euros !!!</h2>");
	if (articulo.stock > 0) {
		res.write("<h3> Nos quedan " + articulo.stock + " en el almacén. ;-)</h3>");
	} else {
		res.write("<h3> Fuera de stock, vuelva otro día. :-(</h3>");
	}
	res.write("</body>");
	res.write("</html>");
	res.end();
}

function notFound(res) {
	res.writeHead(404, {
		'Content-Type': 'text/html'
	});
	res.write("<html>");
	res.write("<head>");
	res.write("<meta charset='utf-8'>");
	res.write("<title>" + titulo + "</title>");
	res.write("</head>");
	res.write("<body>");
	res.write('<h1>404</h1> Nada por aquí');
	res.write("</body>");
	res.write("</html>");
	res.end();
}

function montarLista() {
	var res = "<ul>";

	function linea(articulo) {
		res += "<li><a href='/" + articulo.url + "'>" + articulo.nombre + "</a> a " + articulo.precio + " euros</li>";
	}
	articulos.forEach(linea);
	res += "</ul>"
	return res;
}

function buscarArticulo(uri) {
	var url = uri.substring(1);
	console.log("Filtrar por: " + url);
	var funcionFiltro = function (articulo) {
		return articulo.url.indexOf(url) >= 0;
	};
	return articulos.filter(funcionFiltro)[0];
}











