(function () {
	"use strict";

	angular
		.module('cuentas', ['ngResource']);

	function controlador($resource, socketFactory) {
		
		var vm = this;
		vm.ultimaActualizacion = new Date();
		
		socketFactory.connect();
		socketFactory.on('wellcome', function (data) {
			console.log("Me han recibido bien: " + JSON.stringify(data));
			updateMetrics();
		});

		socketFactory.on('dineroMovido', function (data) {
			console.log("Algo se mueve en la caja.... ");
			updateMetrics();
		});

		function updateMetrics() {
			vm.ultimaActualizacion = new Date();
			vm.totalCuentas = $resource('/api/cuentas/saldo/total').query();
			vm.totalDinero = $resource('/api/movimientos/importe/total').query();
			vm.numeroMovimientos = $resource('/api/movimientos/count').query();
		}
		
	}

	angular
		.module('cuentas')
		.controller("DashboardCtrl", controlador);

	angular.module('cuentas').factory('socketFactory', function ($rootScope) {
		var socket;
		return {
			connect: function () {
				console.log("Conectando...");
				socket = io.connect();
				console.log("Conectado !");
			},
			on: function (eventName, callback) {
				socket.on(eventName, function () {
					var args = arguments;
					console.log(eventName);
					console.log("canal: " + eventName);
					console.log(" datos: " + JSON.stringify(args));
					$rootScope.$apply(function () {
						callback.apply(socket, args);
					});
				});
			},
			emit: function (eventName, data) {
				console.log("Emitiendo...");
				socket.emit(eventName, data);
				console.log("Emitido !");
			}
		}
	});
}());