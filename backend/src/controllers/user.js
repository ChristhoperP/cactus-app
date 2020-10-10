'use strict'

const { request } = require('express');
const { pool } = require('../conexion');
const bcrypt = require('bcrypt');
const rutas = require('../config');

var controller = {
    home: function(req, res) {
        return res.status(200).send({
            message: 'Hello world!'
        });
    },
    registrar: function(req, res) {
        var { nombre, correo, contrasenia, tipoUsuario, telefono, direccion } = req.body;

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

                    res.json({
                        message: arregloRes[1],
                        user: { nombre, correo, contrasenia }

                    })


                } catch (err) {
                    console.log(err);
                    res.json({
                        message: 'Error: No se ha registrado el usuario',
                        body: {
                            user: { nombre, correo, contrasenia }
                        }
                    })
                }
            });
        } else {
            console.log('Error: Faltan campos');
            res.json({
                message: 'Error: Faltan campos, Usuario no registrado',
                body: {
                    user: { nombre, correo, contrasenia }
                }
            })
        }
    }
};

module.exports = controller;