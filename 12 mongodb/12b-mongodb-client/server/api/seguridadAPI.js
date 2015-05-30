"use strict";
var seguridadData = require('../data/seguridadData.js');

module.exports.seguridad = function (app) {
	app.route('/api/usuarios')
		.post(function (req, res, next) {
			var usuario = req.body;
			seguridadData.postingUsuario(usuario)
				.then(function (sesion) {
					if (sesion) {
						res.json(sesion);
					} else {
						res.status(409).send('email ' + usuario.email + ' ya registrado');
					}
				});
		});

	// Gestión de sesiones: listado y login
	app.route('/api/sesiones')
		.post(function (req, res, next) {
			var usuario = req.body;
			seguridadData.postingSesion(usuario)
				.then(function (sesion) {
					if (sesion) {
						res.json(sesion);
					} else {
						res.status(401).send('Credencial inválida');
					}
				});
		});
}
