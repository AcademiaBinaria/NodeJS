"use strict";
var express = require('express');

var app = express();

var options = {
    extensions: ['htm', 'html'],
    maxAge: '1d',
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
};
// Directorio para contenido estático

var funcionEstatica = express.static(__dirname + '/static', options);




var funcionLog = function (peticion, respuesta, siguiente) {
        console.log("recibida petición: " + peticion.url);
        siguiente();
    }
    // Interceptor de llamadas
app.use(funcionLog);
app.use(funcionEstatica);

app.use('/priv', function (req, res, next) {
    if (req.ip === "195090'") {
        next();
    } else {
        res.send(401, "no puedes");
    }
})

// Respuesta a una petición concreta
app.get('/', function (peticion, respuesta) {
    respuesta.send('Hola Express!');
});


app.get('/about', function (peticion, respuesta) {
    respuesta.send('Somos guays!');
});

app.get('/contact', function (peticion, respuesta) {
    respuesta.send('calle melancolía!');
});

app.get('/priv/admin', function (peticion, respuesta) {
    respuesta.send('botonoes que hacen cosas malas!');
});



app.listen(3000);