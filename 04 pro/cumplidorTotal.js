// Biblioteca de funciones de ayuda 
var CumplidorTotal = (function () {
	var http = require('http');
	var Q = require('q');
	// el método exportado puede usar un callback
	// o devolver una promesa en su defecto
	return {
		trabajar: function (ruta, callback) {
			var deferred = Q.defer();
			var llamada = {
				host: ruta
			};
			http.get(llamada, function (res) {
				deferred.resolve(res);
			}).on('error', function (e) {
				deferred.reject(e);
			});
			// esta es la línea mágica que aprovecha el callbac si existe
			deferred.promise.nodeify(callback);
			return deferred.promise;
		}
	}
})();

module.exports = CumplidorTotal;