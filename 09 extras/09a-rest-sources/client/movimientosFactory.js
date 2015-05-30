(function () {

    var movimientosFactory =   function ($resource)  {
		// Las factorias terminan siendo una agrupación de recursos
		// En situaciones complejas pueden usarse para configurar promesas, cachés...
        var factory  =   {};

        // Estamos devolviendo recursos, que internamente son promesas
        factory.movimientos =   $resource("/api/priv/movimientos/");

		// Realmente los métodos crud desaparecen
			factory.postingMovimiento =   function (movimiento)  {
				return $http.post(urlBase + 'priv/movimientos', movimiento);
			};


		factory.total =  $resource("/api/priv/total/");
		// una alternativa es devolver las promesas y ocultar las llamadas
		// pero genera más código del necesario
		factory.total.gettingTotal =  $resource("/api/priv/total/").get().$promise;


        return factory;
    };

    angular.module('controlCajaApp').factory('movimientosFactory', movimientosFactory);
}());
