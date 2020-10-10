'use strict'
const { Pool } = require('pg');

module.exports = {
    pool: new Pool({
        host: 'localhost',
        user: 'postgres',
        password: 'password',
        database: 'cactus',
        port: 5432
    })
}