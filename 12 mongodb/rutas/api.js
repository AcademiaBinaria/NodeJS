"use strict";
var cuentas = require('../data/cuentas.js');

exports.enrutar = function (router) {
	var rutaAPICuentas = router.route('/api/cuentas/');
	var rutaAPICuentaId = router.route('/api/cuentas/:cuentaId');
	var rutaAPIMovimientos = router.route('/api/cuentas/:cuentaId/movimientos');

	rutaAPICuentas
		.get(function (peticion, respuesta) {
			cuentas.selectAll()
				.then(function (data) {
					respuesta.json(data);
				})
				.fail(function (err) {
					respuesta.status(500);
				});
		})
		.post(function (peticion, respuesta) {
			cuentas.insert(peticion.body);
			respuesta.redirect('/cuentas');
		});

	rutaAPICuentaId
		.get(function (peticion, respuesta) {
			cuentas.selectById(peticion.params.cuentaId)
				.then(function (data) {
					respuesta.json(data);
				})
				.fail(function (err) {
					respuesta.status(500);
				});
		})
		.put(function (peticion, respuesta) {
			cuentas.update(peticion.params.cuentaId, peticion.body)
				.then(function (data) {
					respuesta.json(data);
				})
				.fail(function (err) {
					respuesta.status(500);
				});

		})
		.delete(function (peticion, respuesta) {
			cuentas.delete(peticion.params.cuentaId)
				.then(function (result) {
					respuesta.json(result);
				})
				.fail(function (err) {
					respuesta.status(500);
				});
		});

	rutaAPIMovimientos
		.get(function (peticion, respuesta) {
			cuentas.selectMovimientosByCuentaId(peticion.params.cuentaId)
				.then(function (result) {
					respuesta.json(result);
				})
				.fail(function (err) {
					respuesta.status(500);
				});
		})
		.post(function (peticion, respuesta) {
			cuentas.insertMovimiento(peticion.params.cuentaId, peticion.body)
				.then(function (result) {
					respuesta.json(result);
				})
				.fail(function (err) {
					respuesta.status(500);
				});
		});

}