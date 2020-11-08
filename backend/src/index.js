'use strict'

var app = require('./app');
var conf = require('./config');

//starting the server
conf.pool.query('SELECT NOW()', (err, res) => { //probando la conexion a la bbdd
    if(err) {console.log(err)}else{
        console.log("Base de datos corriendo correctamente: " + res.rows[0].now)
    }
});

app.listen(conf.port, ()=>{
    console.log(`Server on port ${conf.port}`);
});