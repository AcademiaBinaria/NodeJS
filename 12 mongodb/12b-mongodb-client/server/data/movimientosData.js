"use strict";
var mongodb = require('./mongodb.js')
var mongoCol = "movimientos"

module.exports.gettingMovimientos = function (usuario) {
	return mongodb.finding(mongoCol, {
		usuario: usuario
	});
}

module.exports.gettingMovimiento = function (movId, usuario) {
	return mongodb.finding(mongoCol, {
		_id: movId,
		usuario: usuario
	});
}

module.exports.gettingTotalUsuario = function (usuario) {
	return mongodb.aggregating(mongoCol, [
		{
			$match: {
				usuario: usuario
			}
			},
		{
			$group: {
				_id: {
					tipo: "$tipo"
				},
				total: {
					$sum: "$importe"
				}
			}
			}
		]);
}
module.exports.postingMovimiento = function (movimiento) {
	return mongodb.inserting(mongoCol,movimiento);
}
