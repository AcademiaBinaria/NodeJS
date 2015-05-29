var Escritor = (function () {
	return {
		cabecera: function (titulo) {
			var html = "<ul>";
			html+= "<html>";
			html+= "<head>";
			html+= "<meta charset='utf-8'>";
			html+= "<title>" + titulo + "</title>";
			html+= "</head>";
			html+= "<body>";
			return html;
		},
		lista: function (lista) {
			var html = "<ul>";

			function linea(articulo) {
				html += "<li><a href='/" + articulo.url + "'>" + articulo.nombre + "</a> a " + articulo.precio + " euros</li>";
			}
			lista.forEach(linea);
			html += "</ul>"
			return html;
		},
		articulo: function (articulo) {
			var html = "<h1>" + articulo.nombre + "</h1>";
			html += "<h2> Precio especial: " + articulo.precio + " euros !!!</h2>";
			if (articulo.stock > 0) {
				html += "<h3> Nos quedan " + articulo.stock + " en el almacén. ;-)</h3>";
			} else {
				html += "<h3> Fuera de stock, vuelva otro día. :-(</h3>";
			}
			return html;
		},
		cierre: function () {
			var html = "</body>";
			html +="</html>";
			return html;
		},
		enviar: function(respuesta, estado, html){
			respuesta.set("Content-Type", "text/html");
			respuesta.status(estado).send(html);
		}
	}

})();

module.exports = Escritor;