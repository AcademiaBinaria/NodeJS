var fs = require('fs'),
	readline = require('linebyline'),
	regexp = require('node-regexp');

var fileOrigen = './fichero/riders.json';
var fileFinal = './fichero/ridersFinal.json';

var re = regexp().must('classicsTotalVictories');

var lineas = "";

fs.writeFile(fileFinal, '', function (err) {
	if (err)
		console.log(err);
	else
	{
		console.log('Fichero Limpio, a trabajar....');
		var rdl = readline(fileOrigen);
		rdl.on('line', transformarLinea);
		rdl.on('end', escribirFichero);
	}
});

function transformarLinea(line) {
	var newLine;
	if (line.match(re)) {
		newLine = line.substring(0, line.length - 1).toString();
	} else {
		newLine = line.toString();
	}
	escribirLinea(newLine);
}

function escribirLinea(linea) {
	lineas += linea + "\n"
}

function escribirFichero() {
	fs.appendFile(fileFinal, lineas, function (err) {
		if (err) throw err;
		console.log('Fichero Listo ;-)');
	});
}