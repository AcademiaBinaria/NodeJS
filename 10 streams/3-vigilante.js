var fs = require("fs");
var path = require('path');

var fotos = path.join(__dirname, "fotos");


// permite atender a cambios en ficheros o directorios
fs.watch(fotos, {
	persistent: true
}, function (event, fileName) {
	// al ocurrir el cambio mostramos estadísitcas de tamaño...
	var foto =  path.join(__dirname,"fotos",fileName);
	var stats = fs.statSync(foto)
	var fileSizeInBytes = stats["size"]
	console.log(fileName + " descargado con " + fileSizeInBytes + " bytes  \n");
});