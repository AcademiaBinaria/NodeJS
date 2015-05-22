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

http.createServer(function (req, res) {
	var uri = url.parse(req.url).pathname;
	console.log('me piden... ' + uri);
	if (uri === "/") {
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
		res.write("</body>");
		res.write("</html>");
		res.end();
	} else {
		console.log('busco en el array... ' + uri);
		var articulo;
		if (articulo) {

		} else {
			console.log("no encuentro: " + uri);
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
	}
}).listen(3000);