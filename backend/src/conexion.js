'use strict'
const { Pool } = require('pg');

module.exports = {
    pool: new Pool({
        host: 'localhost',
        user: 'postgres',
        password: 'postgres',
        database: 'cactus',
        port: 5432
    })
}