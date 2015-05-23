var Cuentas = (function () {
	var Cuenta = require('./cuenta.js');
	var cuentas = [];
	var movimientos = [];
	return {
		selectAll: function () {
			return cuentas;
		},
		selectById: function (cuentaId) {
			return cuentas.filter(function (cuenta) {
				return cuenta.numero === cuentaId;
			})[0];
		},
		insert: function (cuentaBody) {
			var nuevaCuenta = new Cuenta(cuentaBody.propietario, cuentaBody.saldo);
			cuentas.push(nuevaCuenta);
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
		insertMovimiento: function(cuentaId, movimientoBody){
			var cuenta = this.selectById(cuentaId);
			cuenta.ingresar(movimientoBody.importe);
			movimientoBody.cuentaId = cuentaId;
			movimientos.push(movimientoBody);
			return cuenta;
		}
	}

})();

module.exports = Cuentas;