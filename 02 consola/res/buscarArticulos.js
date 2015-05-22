"use strict";
var articulos = [{
	nombre: 'Atún Calvo',
	precio: 1.20,
	stock: 24
	}, {
	nombre: 'Bonilla a la vista',
	precio: 0.60,
	stock: 0
	}, {
	nombre: 'Estrella Galicia',
	precio: 1.10,
	stock: 36
	}, {
	nombre: 'Cabreiroá',
	precio: 0.90,
	stock: 12
	}, {
	nombre: 'Barritas Pescanova',
	precio: 3.50,
	stock: 0
	}];

var stdin = process.stdin,
	stdout = process.stdout;

process.stdin.setEncoding('utf8');

// Obtener el valor buscado desde la consola
var nombre = process.argv[2];

if (nombre) {
	buscarArtículos(nombre);
} else {
	// si no hay nada preguntar
	preguntar("¿Qué estás buscando ?", buscarArtículos);
}

function buscarArtículos(nombre) {
	var funcionFiltro = function (articulo) {
		return articulo.nombre.toLowerCase().indexOf(nombre.toLowerCase()) >= 0;
	};
	// expresión compleja, se pasa como parámetro el resultado de una función
	listar(articulos.filter(funcionFiltro));
	preguntar("¿Algo más ?", preguntarMas);
}

// Pregunta de cierre
function preguntarMas(mas) {
	if (mas.toLowerCase() === "si") {
		preguntar("Vale, ¿Qué más estás buscando ?", buscarArtículos);
	} else {
		process.stdout.write("Gracias por su visita \n");
		process.exit();
	}
}

function listar(articulosFiltrados) {
	function imprimir(articulo) {
		console.log("* - " + articulo.nombre + " a " + articulo.precio + " euros");
	}
	if (articulosFiltrados.length > 0) {
		console.log("Esto es lo que tenemos:");
		articulosFiltrados.forEach(imprimir);
	} else {
		console.log("No encontramos lo que buscas");
	}
}

// La función que pregunta y espera respuesta sigue siendo la misma
function preguntar(pregunta, procesar) {
	stdin.resume();
	stdout.write(pregunta + ": ");
	stdin.once('data', function (respuesta) {
		procesar(respuesta.toString().trim());
	});
}

}());