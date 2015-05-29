var Cuenta = (function(){
	var Mates = require('./mates.js');
	
	var Cuenta = function (propietario, saldo) {
		this.propietario = propietario;
		this.saldo = saldo;
		this.numero = "ES00-" + new Date().getTime() ;
		console.log("creada cuenta para "  + this.propietario + " con " + this.saldo + "€")
    };
	
	Cuenta.prototype = {
		ingresar: function(dinero){
			this.saldo = Mates.sumar(this.saldo,dinero);
			console.log("ingresar: " + dinero + " a " + this.propietario + " tiene " + this.saldo + "€");
		},
		retirar: function(dinero){
			this.saldo = Mates.restar(this.saldo,dinero);
			console.log("retirar: " + dinero + " a " + this.propietario + " tiene " + this.saldo + "€");
		}
	}
	
	return Cuenta;
	
	
	
})();

module.exports = Cuenta;