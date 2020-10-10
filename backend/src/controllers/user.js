'use strict'

const { request } = require('express');
const { pool } = require('../conexion');
const bcrypt = require('bcrypt');
const rutas = require('../config');
const services = require('../services/token');

var controller = {
    home: function(req, res) {
        return res.status(200).send({
            message: 'Hello world!'
        });
    },
    registrar: function(req, res) {
        var { nombre, correo, contrasenia } = req.body;

        //Tipo de usuario cliente
        var tipoUsuario=2;

        if (nombre != null && correo != null && contrasenia != null && tipoUsuario != null) {
            bcrypt.hash(contrasenia, 10, async(err, data) => {
                try {
                    contrasenia = data;
                    console.log(data);
                    const response = await pool.query(
                        'SELECT SP_AGREGAR_USUARIO($1,$2,$3,$4,$5,$6);', [nombre, correo, contrasenia, " ", " ", tipoUsuario]
                    );

                    var respuesta = response.rows[0].sp_agregar_usuario;
                    var respuesta1 = respuesta.substring(1, respuesta.length - 1).replace('"', '').replace('"', '');
                    var arregloRes = respuesta1.split(',');
                    var idUser = arregloRes[2];

                    if (idUser) {
                        console.log(idUser);
                        return res.status(200).send({
                            token: services.createToken(idUser),
                        });
                    } else {
                        return res.status(500).send({
                            message: arregloRes[1]
                        });
                    }

                } catch (err) {
                    console.log(err);
                    return res.status(500).send({
                        message: 'Error: No se ha registrado el usuario',
                    })
                }
            });
        } else {
            return res.status(500).send({
                message: 'Error: Faltan campos, usuario no registrado'
            })
        }
    }
};

module.exports = controller;