var Articulos = (function () {
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
	var Q = require('q');
	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/tiendagallega";
	var mongoCol = "articulos";
	var mongoDB = null;
	var collection = null;
	connectDB();

	return {
		todos: function () {
			var deferred = Q.defer();
			collection.find().toArray(function (err, result) {
				if (!err) {
					deferred.resolve(result);
				} else {
					rejectOnError(deferred, err);
				}
			});
			return deferred.promise;
		},
		porNombre: function (nombre) {
			var deferred = Q.defer();
			collection.find({
				url: nombre
			}).toArray(function (err, result) {
				if (!err) {
					console.log(result[0]);
					deferred.resolve(result[0]);
				} else {
					rejectOnError(deferred, err);
				}
			});
			return deferred.promise;
		}
	}

	function connectDB() {
		MongoClient.connect(mongoUrl, function (err, db) {
			if (err) {
				console.error(err);
			} else {
				mongoDB = db;
				collection = mongoDB.collection(mongoCol);
				iniciar();
			}
		});
	}

	function iniciar() {
		collection.find().toArray(function (err, result) {
			if (!err) {
				if (result && result[0]) {
					console.log("Ya iniaicalizada");
				} else {
					collection.insert(articulos, function (err, result) {
						if (!err) {
							console.log("Insertados: " + result.length + " artículos");
						} else {
							console.error(err);
						}
					});
				}
			} else {
				console.error(err);
			}
		});
	}

	function rejectOnError(deferred, err) {
		console.error(err);
		deferred.reject(err);
	}

})();

module.exports = Articulos;