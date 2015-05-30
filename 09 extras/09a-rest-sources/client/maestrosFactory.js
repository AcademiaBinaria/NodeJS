(function () {
	var maestrosFactory =   function ($resource)  {

//		var urlBase = "http://localhost:3000/api/";
//
//		var factory  =   {};
//
//        factory.gettingMaestros =   function ()  {
//            return $http.get(urlBase+'pub/maestros');
//        };
//
//        return factory;


		// El uso de recursos simplifica mucho la sintaxis
		return $resource("/api/pub/maestros/");
	};

	angular.module('controlCajaApp').factory('maestrosFactory', maestrosFactory);
}());
