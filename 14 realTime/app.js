(function () {
	"use strict";
	
	var config = require('./config.js');
	
	var app =config.initApp();
	// La comunicación sockets va por http, no por express...
	var server = config.initIO(app);
	var router = config.initRouter(app);
	
	var root = router.route('/');
	var rootSimple = router.route('/simple');
	
	root.get(function (peticion, respuesta) {
		respuesta.send('Hola Express!');
	});
	rootSimple.get(function (peticion, respuesta) {
		respuesta.render('simple',{title:"Soy muy simple"});
	});
	
	require('./rutas/api.js').enrutar(router);
	require('./rutas/cuentas.js').enrutar(router);
	
	// Atención: el que escucha ahora es el server http
	server.listen(3000);
}());