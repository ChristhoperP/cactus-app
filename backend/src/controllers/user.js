'use strict'

const { request } = require('express');
const { pool } = require('../conexion');
const bcrypt = require('bcrypt');
const rutas = require('../config');
const services = require('../services/token');

var controller = {
    registrar: function(req, res) {
        var { nombre, correo, contrasenia } = req.body;

        //Tipo de usuario cliente
        var tipoUsuario = 2;

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
                    var rolUser = arregloRes[3];

                    if (idUser && rolUser) {
                        console.log(idUser, rolUser);
                        return res.status(200).send({
                            token: services.createToken(idUser, rolUser),
                            rol: rolUser
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
    },
    validarUsuario: async function(req, res) {
        var { correo, contrasenia } = req.body;
        if (correo != null && contrasenia != null) {
            try {
                const response = await pool.query(
                    'SELECT SP_VALIDAR_USUARIO($1);', [correo]
                );
                var respuesta = response.rows[0].sp_validar_usuario;
                var respuesta1 = respuesta.substring(1, respuesta.length - 1).replace('"', '').replace('"', '');
                var arregloRes = respuesta1.split(',');
                var idUser = arregloRes[0];
                var rolUser = arregloRes[1];
                var contraseniaUser = arregloRes[2];
                var mensajeRes = arregloRes[4];

                const resultadoMatch = await bcrypt.compare(contrasenia, contraseniaUser);

                if (resultadoMatch) {
                    return res.status(200).send({
                        token: services.createToken(idUser, rolUser),
                        rol: rolUser
                    });
                } else {
                    return res.status(500).send({
                        message: 'Usuario no encontrado',
                    })
                }
            } catch (err) {
                console.log(err);
                return res.status(500).send({
                    message: 'Error: No se ha validado el usuario',
                })
            }
        } else {
            return res.status(500).send({
                message: 'Error: campos incompletos',
            })
        }
    },

    infoPerfilUsuario: async function(req, res) {

        try {
            const response = await pool.query(
                `SELECT * FROM INFORMACION_USUARIO_PERFIL WHERE idusuario = ${req.user.id};`
            );

            console.log(response);
            res.json(response.rows);;

        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: 'Error: No se ha podido obtener los datos del usuario.',
            })
        }
    },
    obtenerUsuariosRegistrados: async function(req, res) {
        const response = await pool.query('SELECT * FROM INFORMACION_USUARIOS_REGISTRADOS');
        res.json(response.rows);
    }
};







module.exports = controller;