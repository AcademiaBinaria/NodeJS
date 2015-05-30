(function () {
	var cajaCtrl = function (maestrosFactory, movimientosFactory) {
		var vm = this;

		vm.titulo = "Controla tu Cash Flow";

		vm.maestros = maestrosFactory.get();

		vm.nuevoMovimiento = new movimientosFactory.movimientos();
		vm.nuevoMovimiento.esIngreso = 1;
		vm.nuevoMovimiento.fecha = new Date();

		vm.movimientos = movimientosFactory.movimientos.query();

		vm.totales = movimientosFactory.total.query();

		vm.guardarMovimiento = function () {
			vm.nuevoMovimiento.tipo = vm.tipo(vm.nuevoMovimiento);
			vm.nuevoMovimiento.$save()
				.then(function (postedData) {
					vm.movimientos = movimientosFactory.movimientos.query();
					vm.total = movimientosFactory.total.get();
					vm.nuevoMovimiento.importe = 0;
				});
		}
		vm.balance = function () {
			return vm.totales[1].total - vm.totales[0].total
		}
		vm.tipo = function (movimiento) {
			return movimiento.esIngreso && 'Ingreso' || 'Gasto'
		}
	}
	angular.module('controlCajaApp').controller('CajaCtrl', cajaCtrl);
}());
