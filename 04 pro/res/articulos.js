var Articulos = (function(){
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
	
	return {
		todos: function(){
			return articulos;
		},
		porNombre: function(nombre){
			return buscarArticulo(nombre);
		}
	}
	
	function buscarArticulo(uri) {
		var url = uri.substring(1);
		console.log("Filtrar por: " + url);
		var funcionFiltro = function (articulo) {
			return articulo.url.indexOf(url) >= 0;
		};
		return articulos.filter(funcionFiltro)[0];
	}
	
	

	
})();

module.exports = Articulos;