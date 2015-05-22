(function () {
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

	listadoReposicion();

	function listadoReposicion() {
		var articulosReposicion = [];
		articulosReposicion = obtenerArticulosReposision();
		imprimirArticulosReposicion(articulosReposicion);
	}
	
	function obtenerArticulosReposision(){
		var funcionFiltro = function(articulo){
			return articulo.stock==0;
		};
		var filtrados = articulos.filter(funcionFiltro);
		return filtrados;
	}
	
	function imprimirArticulosReposicion(articulosReposicion){
		function imprimir(articulo){
			console.log("* - " + articulo.nombre + " a " + articulo.precio + " euros");
		}
		console.log("Comprar los siguientes artículos:");
		articulosReposicion.forEach(imprimir);
	}

}());