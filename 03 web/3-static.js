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

http.createServer(staticServer).listen(3000);

function staticServer(req, res) {
	// acceder a la url
	var uri = url.parse(req.url).pathname;
	console.log('me piden... ' + uri);
	if (uri === "/") {
		homePage(res);
	} else {
		fileServer(res, uri);
	}

}

function homePage(res) {
	res.writeHead(200, {
		"Content-Type": "text/html"
	});
	res.write("<html>");
	res.write("<head>");
	res.write("<meta charset='utf-8'>");
	res.write("<title>Hola Mundo</title>");
	res.write("</head>");
	res.write("<body>");
	res.write("<h1>Texto jardcodeado</h1><p>enviado por NodeJS al navegador<p> ;-)");
	res.write("</body>");
	res.write("</html>");
	res.end();
}

function fileServer(res, uri) {
	// obtener la ruta en disco a aprtir de la ruta web
	var filename = path.join(process.cwd(), uri);
	var extension = path.extname(filename).split(".")[1];
	if (!extension) {
		extension = "html";
		filename += "." + extension;
	}
	console.log('busco en el disco... ' + filename);
	fs.exists(filename, function (exists) {
		if (!exists) {
			console.log("no encuentro: " + filename);
			notFound(res);
		} else {
			var mimeType = mimeTypes[extension];
			res.writeHead(200, {
				'Content-Type': mimeType
			});
			var fileStream = fs.createReadStream(filename);
			fileStream.pipe(res);
		}
	});
}

function notFound(res) {
	res.writeHead(404, {
		'Content-Type': 'text/html'
	});
	res.write("<html>");
	res.write("<head>");
	res.write("<meta charset='utf-8'>");
	res.write("<title>Hola Mundo</title>");
	res.write("</head>");
	res.write("<body>");
	res.write('<h1>404</h1> Nada por aquí');
	res.write("</body>");
	res.write("</html>");
	res.end();
}