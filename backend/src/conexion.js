'use strict'
const { Pool } = require('pg');

//Conexión local

module.exports = {
    pool: new Pool({
        host: 'localhost',
        user: 'postgres',
        password: 'password',
        database: 'cactus',
        port: 5432
    })
}

//Conexión remota
/* module.exports = {
    pool: new Pool({
        host: '34.69.154.201',
        user: 'postgres',
        password: 'postgres',
        database: 'postgres',
        port: 5432
    })
} */