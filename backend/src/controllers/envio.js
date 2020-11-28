'use strict'

const conf = require('../config');
const services = require('../services/token');


var controller = {     
       
       getAgenciaEnvio: async function(req, res) {
            let s = 'SELECT idagenciaenvio,nombre,precio FROM agenciaenvio order by idagenciaenvio;';
            const response = await conf.pool.query(s);
            res.json(response.rows);
        },
       getMunicipio: async function(req, res) {
        let s = 'SELECT idmunicipio, descripcion_municipio,iddepartamento, descripcion_departamento ';
        let f = 'FROM SP_OBTENER_municipio() AS ( idmunicipio INT, descripcion_municipio VARCHAR(45),iddepartamento INT, descripcion_departamento VARCHAR(45));';
        const response = await conf.pool.query(s + f);
            res.json(response.rows);
        },
        getDepartamento: async function(req, res) {
            try {
                let s = 'SELECT idDepartamento, descripcion FROM DEPARTAMENTO;';
                const response = await conf.pool.query(s);
                res.json(response.rows);

            } catch (e) {
                return res.status(500).send({
                    message: 'Error: No se puede obtener los municipios'
                });
            }
        },

    }

    module.exports = controller;