var cuentas = require('../data/cuentas.js');

exports.enrutar = function (router) {
	var rutaCuentas = router.route('/cuentas/');
	var rutaCuentasNueva = router.route('/cuentas/nueva');
	var rutaCuentasDni = router.route('/cuentas/dni');

	rutaCuentas.get(function (peticion, respuesta) {
		cuentas.selectAll()
			.then(function (data) {
				respuesta.render('cuentas', {
					cuentas: data
				});
			}).fail(function (err) {
				respuesta.render('error', {
					mensaje: err
				})
			});
	});
	rutaCuentasNueva.get(function (peticion, respuesta) {
		respuesta.render('cuentas_nueva');
	});

	rutaCuentasDni
		.get(function (peticion, respuesta) {
			respuesta.render('cuentas_dni');
		})
		.post(function (peticion, respuesta) {
			console.log(peticion.files);
			respuesta.redirect('/cuentas');
		});

}