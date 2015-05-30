"use strict";
var Q = require('q');
var mongodb = require('./mongodb.js')
var mongoCol = "usuarios"
var sesiones = [];

module.exports.postingUsuario = function (usuario) {
	var deferred = Q.defer();
	mongodb.finding(mongoCol, {
		email: usuario.email
	}).then(function (result) {
		if (result[0]) {
			console.log('email ya registrado:' + usuario.email);
			deferred.resolve(null);
		} else {
			console.log('registrado:' + usuario.email);
			mongodb.inserting(mongoCol, usuario)
			deferred.resolve(newSession(usuario.email));
		}
	})
	return deferred.promise;
}

module.exports.postingSesion = function (usuario) {
	var deferred = Q.defer();
	mongodb.finding(mongoCol, {
		email: usuario.email,
		password: usuario.password
	}).then(function (result) {
		if (result[0]) {
			console.log('aceptado:' + usuario.email);
			deferred.resolve(newSession(usuario.email));
		} else {
			console.log('Credencial inválida:' + usuario.email);
			deferred.resolve(null);
		}
	});
	return deferred.promise;
}

module.exports.getSesion = function (sessionId) {
	var sesion = getSesion(sessionId);
	if (sesion) {
		if (esSesionValida(sesion)) {
			sesion.timeStamp = new Date();
			return sesion;
		} else {
			console.log('Sesión caducada:' + JSON.stringify(sesion));
			sesion.timeStamp = null;
			return sesion;
		}
	} else {
		console.log('Credencial inválida:' + sessionId);
		return null;
	}
}


function getSesion(sessionId) {
	return sesiones.filter(function (s) {
		return s.sessionId == sessionId;
	})[0]
}

function esSesionValida(sesion) {
	return (new Date() - sesion.timeStamp) < 20 * 60 * 1000;
}

function newSession(email) {
	var sessionId = Math.random() * (88888) + 11111;
	var timeStamp = new Date();
	sesiones.push({
		sessionId: sessionId,
		email: email,
		timeStamp: timeStamp
	});
	return sessionId;
}
