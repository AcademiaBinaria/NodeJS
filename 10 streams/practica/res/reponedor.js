var fs = require("fs");
var path = require('path');

var pedidos = path.join(__dirname, "pedidos.txt");

fs.watchFile(pedidos, {
	persistent: true
}, function (event, fileName) {
	leerPedidos(fileName);
});

function leerPedidos() {
	fs.exists(pedidos, function (exists) {
		if (exists) {
			fs.readFile(pedidos, {
				encoding: 'utf-8'
			}, function (err, data) {
				if (err)
					console.log(err);
				else {
					if (data === '') {
						console.log("Control vacío");
					} else {
						console.log("Pedidos Pendientes");
						console.log(data);
						fs.writeFile(pedidos, '', function (err) {
							if (err)
								console.log(err);
							else
								console.log('Pedidos Servidos')
						});
					}
				}
			});
		} else {
			console.error("No se encuentra: " + pedidos);
		}
	});
}