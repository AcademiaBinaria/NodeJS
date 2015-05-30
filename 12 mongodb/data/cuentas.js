// Este es el módulo de acceos a datos
var Cuentas = (function () {
	var Q = require('q');
	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/bancab";
	var mongoCol = "cuentas";
	var mongoDB = null;
	var collection = null;
	var Cuenta = require('./cuenta.js');
	connectDB();
	
	// siempre trabajamos en asíncrono
	// prefiero promesas y no callbacks
	return {
		selectAll: function (respuesta) {
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
		selectById: function (cuentaId) {
			var deferred = Q.defer();
			collection.find({
				numero: cuentaId
			}).toArray(function (err, result) {
				if (!err) {
					console.log(result[0]);
					deferred.resolve(result[0]);
				} else {
					rejectOnError(deferred, err);
				}
			});
			return deferred.promise;
		},
		insert: function (cuentaBody) {
			var nuevaCuenta = new Cuenta(cuentaBody.propietario, cuentaBody.saldo);
			var deferred = Q.defer();
			collection.insert(nuevaCuenta, function (err, result) {
				if (!err) {
					deferred.resolve(result[0]);
				} else {
					rejectOnError(deferred, err);
				}
			});
			return deferred.promise;
		},
		update: function (cuentaId, cuentaBody) {
			var deferred = Q.defer();
			collection.findAndModify({
					numero: cuentaId
				}, {}, {
					$set: {
						propietario: cuentaBody.propietario,
						saldo: cuentaBody.saldo
					}
				}, {},
				function (err, result) {
					if (!err) {
						console.log(result[0]);
						deferred.resolve(result[0]);
					} else {
						rejectOnError(deferred, err);
					}
				});
			return deferred.promise;
		},
		delete: function (cuentaId) {
			var deferred = Q.defer();
			collection.remove({
					numero: cuentaId
				},
				function (err, result) {
					if (!err) {
						console.log("Borrado: " + cuentaId);
						deferred.resolve(1);
					} else {
						rejectOnError(deferred, err);
					}
				});
			return deferred.promise;
		},
		selectMovimientosByCuentaId: function (cuentaId) {
			var deferred = Q.defer();
			collection.find({
				numero: cuentaId
			}, {
				"_id": false,
				"movimientos": true
			}).toArray(function (err, result) {
				if (!err) {
					console.log(result[0]);
					deferred.resolve(result[0]);
				} else {
					rejectOnError(deferred, err);
				}
			});
			return deferred.promise;
		},
		insertMovimiento: function (cuentaId, movimientoBody) {
			var deferred = Q.defer();
			collection.findAndModify({
					numero: cuentaId
				}, {}, {
					$push: {
						movimientos: movimientoBody
					}
				}, {},
				function (err, result) {
					if (!err) {
						console.log(result);
						deferred.resolve(result);
					} else {
						rejectOnError(deferred, err);
					}
				});
			return deferred.promise;
		}
	}

	
	// la conxión es siempre la misma, pues no hay nada simultaneo
	function connectDB() {
		MongoClient.connect(mongoUrl, function (err, db) {
			if (err) {
				console.error(err);
			} else {
				mongoDB = db;
				collection = mongoDB.collection(mongoCol);
			}
		});
	}

	function rejectOnError(deferred, err) {
		console.error(err);
		deferred.reject(err);
	}

})();

module.exports = Cuentas;