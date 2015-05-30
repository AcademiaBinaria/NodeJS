(function () {
    var cajaCtrl = function (maestrosFactory, movimientosFactory) {
        var vm = this;

        vm.titulo = "Controla tu Cash Flow";

		// Al usar recursos, la sintaxis se asemaja de nuevo al modelo síncrono
		// eso es posible porque AngularJS maneja internamente las promesas

			maestrosFactory.gettingMaestros()
				.success(function (maestros) {
					vm.maestros = maestros;
				});
		//vm.maestros = maestrosFactory.get();

			vm.nuevoMovimiento = {
				esIngreso: 1,
				esGasto: 0,
				importe: 0,
				fecha: new Date()
			};

//		vm.nuevoMovimiento = new movimientosFactory.movimientos();
//		vm.nuevoMovimiento.esIngreso =1;
//		vm.nuevoMovimiento.fecha = new Date();


			movimientosFactory.gettingMovimientos()
				.success(function (movimientos) {
					vm.movimientos = movimientos;
				});
		// Si el recurso devuelve un array, tenemos usar el método query en lugar de get que es para un elemnto
//		vm.movimientos = movimientosFactory.movimientos.query();


//        movimientosFactory.gettingTotal()
//            .success(function (total) {
//                vm.total = total;
//            });
		vm.total = movimientosFactory.total.get();

        vm.guardarMovimiento = function () {
            vm.nuevoMovimiento.tipo = vm.tipo(vm.nuevoMovimiento);
					movimientosFactory.postingMovimiento(vm.nuevoMovimiento)
						.success(function (postedData) {
							// cuando ha terminado el guardado del movimiento
							// es momento de pedir una actualización de datos
							movimientosFactory.gettingMovimientos()
								.success(function (movimientos) {
									vm.movimientos = movimientos;
								});
							movimientosFactory.gettingTotal()
								.success(function (total) {
									vm.total = total;
								});
						});
			// La sintaxis ahora es totalmente distinta
			// Se basa en el patrón ActiveRecord
			// Tenemos que imaginarnos los recursos como objetos 'dopados' con superpoderes
//			vm.nuevoMovimiento.$save()
//			.then(function(postedData){
//				// Igualmente, tenemos que recargar los datos tras enviar un nuevo movimiento
//				vm.movimientos = movimientosFactory.movimientos.query();
//				vm.total = movimientosFactory.total.get();
//                vm.nuevoMovimiento.importe = 0;
//			});


        }
        vm.balance = function () {
            return vm.total.ingresos - vm.total.gastos
        }
        vm.tipo = function (movimiento) {
            return movimiento.esIngreso && 'Ingreso' || 'Gasto'
        }
    }
    angular.module('controlCajaApp').controller('CajaCtrl', cajaCtrl);
}());
