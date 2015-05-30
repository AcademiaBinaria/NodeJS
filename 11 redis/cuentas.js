var Cuentas = (function () {
	var Cuenta = require('./cuenta.js');
	// paquete cliente de redis
	var redis = require('redis');
	var Q = require('q');

	// Configuración básica de redis
	var redisClient = redis.createClient(
		12677, 'pub-redis-12677.us-east-1-2.2.ec2.garantiadata.com', {
			no_ready_check: true
		});
	redisClient.auth('nodeacademy', function (err) {
		if (err) console.log(err);
	});
	redisClient.on('connect', function () {    
		console.log('conectados al servidor redis');
	});
	
	var cuentas = [];
	var movimientos = [];
	
	return {
		selectPropietarios: function () {
			// obtener la lista de propietarios
			var deferred = Q.defer();
			redisClient.smembers("propietarios", function (err, reply) {
				if(err) deferred.reject(err);
				deferred.resolve(reply);
			});
			return deferred.promise;
		},
		selectAll: function (propietarios) {
			var promises = [];
			var todasLasCuentas = [];
			// PAra cada propietario leer sus cuentas
			propietarios.forEach(function (propietario) {
				var deferred = Q.defer();
				redisClient.hgetall(propietario, function (err, reply) {
					if(err) deferred.reject(err);
					// acumular los resultado
					todasLasCuentas.push(reply);
					// Se resuelve cada una por separado
					// pero no se notifica en ese instante
					deferred.resolve(todasLasCuentas);
				});
				// Las promesas individuales se acumulan
				promises.push(deferred.promise);
			});
			// Se devuelve una promesa que las envualeve a todas
			return Q.all(promises);
		},
		selectById: function (cuentaId) {
			return cuentas.filter(function (cuenta) {
				return cuenta.numero === cuentaId;
			})[0];
		},
		insert: function (cuentaBody) {
			var nuevaCuenta = new Cuenta(cuentaBody.propietario, cuentaBody.saldo);
			cuentas.push(nuevaCuenta);
			// Para cada cuenta nueva, se agrega un propietario a la lista
			redisClient.sadd("propietarios", cuentaBody.propietario, function (err, reply) {
				// Y para ese propietario se crea una cuenta
				redisClient.hmset(cuentaBody.propietario, nuevaCuenta, function (err, reply) {
					console.log("Insertada cuenta: " + nuevaCuenta);
				});
			});
			return nuevaCuenta;
		},
		update: function (cuentaId, cuentaBody) {
			var cuenta = this.selectById(cuentaId);
			cuenta.propietario = cuentaBody.propietario;
			cuenta.saldo = cuentaBody.saldo;
			return cuenta;
		},
		delete: function (cuentaId) {
			var index = cuentas.indexOf(function (cuenta) {
				return cuenta.numero === cuentaId;
			});
			cuentas.splice(index, 1);
			return {
				deleted: 1
			};
		},
		selectMovimientosByCuentaId: function (cuentaId) {
			return movimientos.filter(function (movimiento) {
				return movimiento.cuentaId === cuentaId;
			});
		},
		insertMovimiento: function (cuentaId, movimientoBody) {
			var cuenta = this.selectById(cuentaId);
			cuenta.ingresar(movimientoBody.importe);
			movimientoBody.cuentaId = cuentaId;
			movimientos.push(movimientoBody);
			// Actualizamos los datos de la cuenta
			redisClient.hmset(cuenta.propietario, cuenta, function (err, reply) {
				console.log(reply);
			});
			return cuenta;
		}
	}

})();

module.exports = Cuentas;