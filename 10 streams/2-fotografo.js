// Módulo para realizar peticiones http
var request = require('request');

// página que quieres descargar
var ruta = process.argv[2];
// fichero dóinde guardarla
var file = process.argv[3];


if (!ruta) ruta = 'http://localhost:3000';


if (!file) {
	request(ruta, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(body);
		} else {
			console.error(error);
		}
	});
} else {
	var fs = require('fs');
	var path = require('path');
	var foto =  path.join(__dirname,"fotos",file);
	// stream encauzado por tuberias
	request(ruta).pipe(fs.createWriteStream(foto));
}