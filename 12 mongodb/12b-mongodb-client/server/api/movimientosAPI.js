"use strict";
var movimientosData = require('../data/movimientosData.js');

module.exports.routeMovimientos = function (app) {

    app.route('/api/priv/movimientos')
        .get(function (req, res, next) {
            promise2response(
                movimientosData.gettingMovimientos(req.usuario), res);
        })
        .post(function (req, res, next) {
            var movimiento = req.body;
            movimiento.usuario = req.usuario;
            var pro = movimientosData.postingMovimiento(movimiento);
            promise2response(pro, res);
        });

    function promise2response(pro, res) {
        pro
            .then(function (result) {
                res.status(200).send();
            })
            .fail(function (err) {
                res.status(500).send(err);
            });
    }

    app.get('/api/priv/movimientos/:id', function (req, res, next) {
        //res.json(movimientosData.getMovimiento(req.params.id, req.usuario));
        movimientosData.gettingMovimiento(req.params.id, req.usuario)
            .then(function (result) {
                res.json(result[0]);
            })
            .fail(function (err) {
                res.status(500).send(err);
            });
    });

    app.get('/api/priv/total', function (req, res, next) {
        //res.json(movimientosData.getTotalUsuario(req.usuario));
        movimientosData.gettingTotalUsuario(req.usuario)
            .then(function (result) {
                res.json(result);
            })
            .fail(function (err) {
                res.status(500).send(err);
            });
    });


}
