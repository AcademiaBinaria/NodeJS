// llamamos a un módulo externo
var CumplidorTotal = require('./cumplidorTotal.js');

// lo podemos usar vía promesas 
CumplidorTotal.trabajar('agorabinaria.com')
	.then(function (res) {
		console.log("Trabajo lento via promesa terminado: " + res.statusCode);
	})
	.fail(function (err) {
		console.log("Trabajo lento via promesa con error: " + err.message);
	});

// Y también con callbacks
CumplidorTotal.trabajar('agorabinaria.com', function (err, res) {
	if (err) {
		console.log("Trabajo lento via callback con error: " + err.message);
	} else {
		console.log("Trabajo lento via callback terminado: " + res.statusCode);
	}
})