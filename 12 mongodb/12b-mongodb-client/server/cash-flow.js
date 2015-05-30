"use strict";
var settings = require("./settings.js");
var app = require('./express.js').configApp();
console.log('ready... settings ok', settings);

require('./api/seguridadAPI.js').seguridad(app);
require('./api/maestrosAPI.js').routeMaestros(app);
require('./api/movimientosAPI.js').routeMovimientos(app);
console.log('steady... routes OK');

app.listen(settings.port);
console.log('go... listening on port: ' + settings.port);
