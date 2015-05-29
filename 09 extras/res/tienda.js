(function () {
	"use strict";
	var config = require('./config.js');
	
	var app =config.initApp();
	var router = config.initRouter(app);
	require('./rutas/index.js')(router);
	
	app.listen(3000);

}());