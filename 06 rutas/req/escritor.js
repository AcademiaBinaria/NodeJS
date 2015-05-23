var Escritor = (function () {
	return {
		cabecera: function (res, estado, titulo) {
			res.writeHead(estado, {
				"Content-Type": "text/html"
			});
			res.write("<html>");
			res.write("<head>");
			res.write("<meta charset='utf-8'>");
			res.write("<title>" + titulo + "</title>");
			res.write("</head>");
		},
		lista: function (res, lista) {
			var html = "<ul>";

			function linea(articulo) {
				html += "<li><a href='/" + articulo.url + "'>" + articulo.nombre + "</a> a " + articulo.precio + " euros</li>";
			}
			lista.forEach(linea);
			html += "</ul>"
			res.write(html);
		},
		articulo: function (res, articulo) {
			res.write("<h1>" + articulo.nombre + "</h1>");
			res.write("<h2> Precio especial: " + articulo.precio + " euros !!!</h2>");
			if (articulo.stock > 0) {
				res.write("<h3> Nos quedan " + articulo.stock + " en el almacén. ;-)</h3>");
			} else {
				res.write("<h3> Fuera de stock, vuelva otro día. :-(</h3>");
			}
		},
		cierre: function (res) {
			res.write("</body>");
			res.write("</html>");
			res.end();
		}
	}


})();

module.exports = Escritor;