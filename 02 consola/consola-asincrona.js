// Versión básica de interacción con la consola
"use strict";
var stdin = process.openStdin();

var nombre = 'Anónimo';
var edad = 43;

console.log("¿Cómo te llamas ?");
stdin.addListener("data", function (data) {
	nombre = data.toString().substring(0, data.length - 1);
	imprimir();
});


function imprimir() {
	console.log(nombre + " tiene " + edad + " años");
}


// Versión más elaborada con callbacks
//	"use strict";
//	var stdin = process.stdin,
//		stdout = process.stdout;
//	var persona = {
//		nombre: 'Anónimo',
//		edad: 0
//	};
//	
//	process.stdin.setEncoding('utf8');
//
//	preguntar("¿Cómo te llamas ?", guardarNombre);
//
//	function guardarNombre(nombre) {
//		persona.nombre = nombre;
//		// Volver a preguntar
//		preguntar("Hola " + persona.nombre + " ¿Cuantos años tienes?", guardarEdad);
//	}
//
//	function guardarEdad(edad) {
//		persona.edad = edad;
//		if (persona.edad >= 18) {
//			process.stdout.write("Adelante " + persona.nombre + " de " + persona.edad + " años \n");
//		}
//		else{
//			process.stdout.write("Lo siento " + persona.nombre + " de " + persona.edad + " años \n");
//		}
//		process.exit();
//	}
//
//	function preguntar(pregunta, procesoPorterior) {
//		stdin.resume();
//		stdout.write(pregunta + ": ");
//		// cuando tengamo datos
//		stdin.once('data', function (respuesta) {
//			// ejecutar el callback que no han pasado
//			// con los datos obtenidos
//			procesoPorterior(respuesta.toString().trim());
//		});
//	}
//
//}());