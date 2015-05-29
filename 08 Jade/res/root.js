var Root = (function () {
	return {
		todos: function(){
			return articulos;
		},
		porNombre: function(nombre){
			return buscarArticulo(nombre);
		}
	}
})();

module.exports = Root;