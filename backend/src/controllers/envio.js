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


        registroInfoEnvio: async function(req, res) {

        var { nombrecompleto, direccioncompleta, domicilio, idagenciaenvio, idmunicipio } = req.body;
        /* console.log(nombrecompleto, direccioncompleta, domicilio, idagenciaenvio, idmunicipio); */

        if (nombrecompleto != null && direccioncompleta != null && domicilio != null && idagenciaenvio != null && idmunicipio != null) {

            try {

        
                const response = await conf.pool.query(
                    'SELECT SP_REGISTRAR_INFOENVIO($1,$2,$3,$4,$5);', [nombrecompleto, direccioncompleta, domicilio, parseInt(idagenciaenvio), parseInt(idmunicipio)]
                );
                console.log('se ha registrado exitosamente la informacion del envio');
                var respuesta = response.rows[0].sp_registrar_infoenvio;
                var respuesta1 = respuesta.substring(1, respuesta.length - 1).replace('"', '').replace('"', '');
                var arregloRes = respuesta1.split(',');
                var mensaje = arregloRes[1];
                var idInformacionEnvio = arregloRes[2];

                return res.status(200).send({
                    message: mensaje,
                    body: req.body,
                    idInformacionEnvio: idInformacionEnvio
                });

            } catch (err) {
                console.log(err);
                return res.status(500).send({
                    message: 'Error: No se ha registrado la informacion del envio',
                })
            }
        } else {
            return res.status(500).send({
                message: 'Error: Faltan campos, no se registro la informacion del envio'
            })
        }
    },

    }

    module.exports = controller;