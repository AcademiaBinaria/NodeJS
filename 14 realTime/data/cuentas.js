var Cuentas = (function () {
	var Q = require('q');
	var MongoClient = require('mongodb').MongoClient;
	var mongoUrl = "mongodb://localhost:27017/bancab";
	var mongoCol = "cuentas";
	var mongoDB = null;
	var collection = null;
	var Cuenta = require('./cuenta.js');
	connectDB();
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
		getSaldoTotal: function (respuesta) {
			var deferred = Q.defer();
			collection.aggregate([
				{
					$group: {
						_id: null,
						saldoTotal: {
							$sum: '$saldo'
						}
					}
				}
			], function (err, result) {
				if (!err) {
					deferred.resolve(result);
				} else {
					rejectOnError(deferred, err);
				}
			});
			return deferred.promise;
		},
		getMovimientosTotal: function (respuesta) {
			var deferred = Q.defer();
			collection.aggregate([
				{
					$unwind: '$movimientos'
				},
				{
					$group: {
						_id: null,
						totalMovimientos: {
							$sum: "$movimientos.importe"
						}
					}
				}
			], function (err, result) {
				if (!err) {
					deferred.resolve(result);
				} else {
					rejectOnError(deferred, err);
				}
			});
			return deferred.promise;
		},
		getMovimientosCount: function (respuesta) {
			var deferred = Q.defer();
			collection.aggregate([
				{
					$project: {
						_id: 1,
						numMovs: {
							$size: '$movimientos'
						}
					}
				},
				{
					$group: {
						_id: null,
						totalMovs: {
							$sum: '$numMovs'
						}
					}
				}
			], function (err, result) {
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
			var nuevaCuenta = new Cuenta(cuentaBody.propietario, parseInt(cuentaBody.saldo));
			nuevaCuenta.movimientos=[];
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
						saldo: parseInt(cuentaBody.saldo)
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
			movimientoBody.importe = parseInt(movimientoBody.importe);
			var deferred = Q.defer();
			collection.find({
				numero: cuentaId
			}).toArray(function (err, result) {
				if (!err) {
					var cuenta = result[0];
					console.log("before:" + JSON.stringify(cuenta));
					if(cuenta.movimientos==="undefined") cuenta.movimientos=[];
					cuenta.movimientos.push(movimientoBody);
					cuenta.saldo += movimientoBody.importe;
					collection.findAndModify({
							numero: cuentaId
						}, {}, {
							$set: {
								saldo: parseInt(cuenta.saldo),
								movimientos : cuenta.movimientos
							}
						}, {},
						function (err, result) {
							if (!err) {
								console.log("after:" + JSON.stringify(cuenta));
								deferred.resolve(cuenta);
							} else {
								rejectOnError(deferred, err);
							}
						});
				} else {
					rejectOnError(deferred, err);
				}
			});


			collection.findAndModify({
					numero: cuentaId
				}, {}, {
					$push: {
						movimientos: movimientoBody
					},

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