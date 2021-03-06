'use strict'
const { Pool } = require('pg');

var produccion = false; //cambiar valor dependiendo el entorno

if (produccion) {
    module.exports = {
        port: process.env.PORT || 3000,
        SECRET_TOKEN: 'miclavedetokenxd', //clave secreta del para codificar el token
        bucketName: 'cactus_files', //nombre del bucket de google
        pool: new Pool({
            host: '34.66.95.74',
            user: 'postgres',
            password: 'postgres',
            database: 'cactus',
            port: 5432
        }),
        produccion: true
    }
} else {
    module.exports = {
        port: process.env.PORT || 3000,
        SECRET_TOKEN: 'miclavedetokenxd', //clave secreta del para codificar el token
        pool: new Pool({
            host: 'localhost',
            user: 'postgres',
            password: 'postgres',
            database: 'cactus',
            port: 5432
        }),
        produccion: false
    }
}