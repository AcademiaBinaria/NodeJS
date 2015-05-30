(function () {
	"use strict";
	var config = require('./config.js');

	var app = config.initApp();
	var router = config.initRouter(app);
	require('./rutas/root.js').enrutar(router);
	require('./rutas/api.js').enrutar(router);
	require('./rutas/articulo.js').enrutar(router);

	app.listen(3000);

}());