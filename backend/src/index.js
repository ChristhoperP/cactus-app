'use strict'

var app = require('./app');
var rutas = require('./config');

//starting the server
app.listen(rutas.port, ()=>{
    console.log(`Server on port ${rutas.port}`);
});