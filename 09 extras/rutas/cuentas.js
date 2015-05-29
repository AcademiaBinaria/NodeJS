var cuentas = require('../cuentas.js');

exports.enrutar = function(router){
	var rutaCuentas = router.route('/cuentas/');
	var rutaCuentasNueva = router.route('/cuentas/nueva');
	
	rutaCuentas.get(function (peticion, respuesta) {
		respuesta.render('cuentas',{cuentas:cuentas.selectAll()});
	});
	rutaCuentasNueva.get(function (peticion, respuesta) {
		respuesta.render('cuentas_nueva');
	});
	
}