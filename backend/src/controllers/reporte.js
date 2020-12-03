'use strict'

const conf = require('../config');
const services = require('../services/token');


var controller = {     
       
    reporteUsuario: async function(req, res) {
        
        const response = await conf.pool.query(`SELECT * FROM REPORTE_USUARIO`);
        res.json(response.rows);
    }
    }

    module.exports = controller;