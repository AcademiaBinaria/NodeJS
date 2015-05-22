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

preguntar("¿Qué estás buscando ?", buscarArtículos);

function buscarArtículos(nombre) {

}

function listar(filtrados) {

}

function preguntar(pregunta, procesar) {
	stdin.resume();
	stdout.write(pregunta + ": ");
	stdin.once('data', function (respuesta) {
		procesar(respuesta.toString().trim());
	});
}