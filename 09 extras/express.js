"use strict";
// los requerimientos se desplazan :-)
var express = require('express');
var bodyParser = require('body-parser');
// Morgan es un paquete para crear logs
var morgan = require('morgan');
var fs = require('fs');

var options = {
    extensions: ['htm', 'html'],
    maxAge: '1d',
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
};

exports.initApp = function () {

    var app = express();
    app.use(express.static(__dirname + '/static', options));

    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');


    //app.use(morgan('combined'));
    var fileLog = fs.createWriteStream(__dirname + '/app.log', {
        flags: 'a'
    })
    app.use(morgan('combined', {
        stream: fileLog
    }));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(function (peticion, respuesta, siguiente) {
        console.log("recibida petición: " + peticion.url);
        if (peticion.body) {
            console.log("body: " + JSON.stringify(peticion.body));
        }
        siguiente();
    });
    return app;
}

exports.initRouter = function (app) {
    var router = express.Router();
    app.use(router);
    return router;
}