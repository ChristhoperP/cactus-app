'use strict'

var app = require('./app');
var rutas = require('./config');
const { pool } = require('./conexion');

//starting the server
pool.query('SELECT NOW()', (err, res) => { //probando la conexion a la bbdd
    if(err) {console.log(err)}else{
        console.log("Base de datos corriendo correctamente: " + res.rows[0].now)
    }
});

app.listen(rutas.port, ()=>{
    console.log(`Server on port ${rutas.port}`);
});