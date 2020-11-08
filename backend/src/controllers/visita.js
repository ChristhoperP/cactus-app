'use strict'

const conf = require('../config');

var controller = {
    visitaInicio: async function (req, res) {
        try {
            const response = await conf.pool.query(
                'INSERT INTO public.visita(fechavisita) VALUES (CURRENT_TIMESTAMP) RETURNING idvisita;'
            );

            return res.status(200).send(response.rows[0]);

        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: 'Error: No se ha podido obtener las visitas y los usuarios',
            })
        }
    },
    visitaFinal: async function (req, res) {
        try {
            await conf.pool.query(
                `UPDATE public.visita SET fechafinvisita=CURRENT_TIMESTAMP WHERE idvisita=${req.params.id};`
            );

            return res.status(200).send({message: "fecha fin visita establecida"});

        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: 'Error: no se ha podido establecer la fecha final de la visita.',
            })
        }
    }

};

module.exports = controller;