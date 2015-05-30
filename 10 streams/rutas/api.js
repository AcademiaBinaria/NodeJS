"use strict";
var cuentas = require('../cuentas.js');

exports.enrutar = function(router){
	var rutaAPICuentas = router.route('/api/cuentas/');
	var rutaAPICuentaId = router.route('/api/cuentas/:cuentaId');
	var rutaAPIMovimientos = router.route('/api/cuentas/:cuentaId/movimientos');
	
	rutaAPICuentas
		.get(function (peticion, respuesta) {
			respuesta.json(cuentas.selectAll());
		})
		.post(function (peticion, respuesta) {
			cuentas.insert(peticion.body);
			respuesta.redirect('/cuentas');
		});

	rutaAPICuentaId
		.get(function (peticion, respuesta) {
			respuesta.json(cuentas.selectById(peticion.params.cuentaId));
		})
		.put(function (peticion, respuesta) {
			respuesta.json(cuentas.update(peticion.params.cuentaId, peticion.body));
		})
		.delete(function (peticion, respuesta) {
			respuesta.json(cuentas.delete(peticion.params.cuentaId));
		});

	rutaAPIMovimientos
		.get(function (peticion, respuesta) {
			respuesta.json(cuentas.selectMovimientosByCuentaId(peticion.params.cuentaId));
		})
		.post(function (peticion, respuesta) {
			respuesta.json(cuentas.insertMovimiento(peticion.params.cuentaId, peticion.body));
		});

}