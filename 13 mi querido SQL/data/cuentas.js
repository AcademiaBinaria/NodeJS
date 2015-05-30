var Cuentas = (function () {
	var Q = require('q');

	var mysql = require('mysql');

	var sqlDB = mysql.createConnection({
		host: 'sql3.freemysqlhosting.net',
		user: 'sql370197',
		password: 'kQ1!hV1!',
		database: 'sql370197'
	});

	var Cuenta = require('./cuenta.js');
	
	return {
		selectAll: function (respuesta) {
			var deferred = Q.defer();
			sqlDB.query('SELECT * from Cuentas', function (err, rows) {
				if (!err) {
					console.log("mySQL: " + JSON.stringify(rows));
					deferred.resolve(rows);
				} else {
					rejectOnError(deferred, err);
				}
			});
			return deferred.promise;
		},
		selectById: function (cuentaId) {
			var deferred = Q.defer();
			sqlDB.query('SELECT * from Cuentas where numero = ?' , cuentaId, function (err, rows) {
				if (!err) {
					console.log("mySQL: " + JSON.stringify(rows));
					deferred.resolve(rows[0]);
				} else {
					rejectOnError(deferred, err);
				}
			});
			return deferred.promise;
		},
		insert: function (cuentaBody) {
			var nuevaCuenta = new Cuenta(cuentaBody.propietario, cuentaBody.saldo);
			var deferred = Q.defer();
			sqlDB.query(
				'INSERT INTO Cuentas SET ?', {
					numero: nuevaCuenta.numero,
					propietario: nuevaCuenta.propietario
				},
				function (err, result) {
					if (!err) {
						sqlDB.query(
							'INSERT INTO Movimientos SET ?', {
								numero: nuevaCuenta.numero,
								importe: nuevaCuenta.saldo
							},
							function (err, result) {
								if (!err) {
									deferred.resolve(nuevaCuenta);
								} else {
									rejectOnError(deferred, err);
								}
							}
						);
					} else {
						rejectOnError(deferred, err);
					}
				}
			);
			return deferred.promise;
		},
		update: function (cuentaId, cuentaBody) {
			var deferred = Q.defer();
			 // To Do ...
			return deferred.promise;
		},
		delete: function (cuentaId) {
			var deferred = Q.defer();
			// To Do ...
			return deferred.promise;
		},
		selectMovimientosByCuentaId: function (cuentaId) {
			var deferred = Q.defer();
			// To Do ...
			return deferred.promise;
		},
		insertMovimiento: function (cuentaId, movimientoBody) {
			var deferred = Q.defer();
			// To Do ...
			return deferred.promise;
		}
	}


	function rejectOnError(deferred, err) {
		console.error(err);
		deferred.reject(err);
	}

})();

module.exports = Cuentas;