(function () {
	"use strict";
	// llevar fuera la configuración
	var config = require('./express.js');
	
	// iniciar la aplicación
	var app =config.initApp();
	// y el router
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
	
	app.listen(3000);
}());