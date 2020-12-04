'use strict'

const bcrypt = require('bcrypt');
const conf = require('../config');
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
                    const response = await conf.pool.query(
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
                const response = await conf.pool.query(
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
            const response = await conf.pool.query(
                `SELECT * FROM INFORMACION_USUARIO_PERFIL WHERE idusuario = ${req.user.id};`
            );

            //console.log(response);
            var respuesta = response.rows;

            return res.status(200).send(respuesta[0]);

        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: 'Error: No se ha podido obtener los datos del usuario.',
            })
        }


    },
    obtenerUsuariosRegistrados: async function(req, res) {
        const response = await conf.pool.query('SELECT * FROM INFORMACION_USUARIOS_REGISTRADOS');
        res.json(response.rows);
    },
    actualizarInfoUsuarios: async function(req, res) {
        var { nombre, contraseniaAnterior, contraseniaNueva, telefono, direccion, opcion } = req.body;
        var idUsuario = req.user.id;

        switch (parseInt(opcion)) {
            case 1: //modifica el nombre
                if (idUsuario && nombre) {
                    await conf.pool.query(`UPDATE public.usuario SET nombre='${nombre}' WHERE idusuario=${idUsuario};`);
                    res.status(200).send({ nombre: nombre, message: "Se actualizó el nombre correctamente." });
                } else {
                    res.status(500).send({
                        message: 'Error: No se ha podido actualizar el dato del usuario.',
                    });
                }
                break;
            case 2: //actualiza la contrasenia
                if (idUsuario && contraseniaAnterior && contraseniaNueva) {
                    const response = await conf.pool.query(`SELECT contrasenia FROM public.usuario where idusuario=${idUsuario};`);

                    const resultadoMatch = await bcrypt.compare(contraseniaAnterior, response.rows[0].contrasenia);

                    if (resultadoMatch) {
                        try {
                            bcrypt.hash(contraseniaNueva, 10, async(err, data) => {
                                try {
                                    contraseniaNueva = data;

                                    await conf.pool.query(`UPDATE public.usuario SET contrasenia='${contraseniaNueva}' WHERE idusuario=${idUsuario};`);
                                    res.status(200).send({ message: "Se actualizó la contrasenia correctamente." });

                                } catch (err) {
                                    console.log(err);
                                    res.status(500).send({ message: "No se pudo actualizar la contrasenia." });
                                }
                            });
                        } catch (err) {
                            console.log(err);
                            res.status(500).send({
                                message: 'Error: datos no actualizados'
                            })
                        }
                    } else {
                        res.status(500).send({
                            message: 'No coinciden.',
                        })
                    }
                } else {
                    res.status(500).send({
                        message: 'Error: No se ha podido actualizar el dato del usuario.',
                    });
                }
                break;
            case 3: //actualizar el telefono
                if (idUsuario && telefono) {
                    await conf.pool.query(`UPDATE public.usuario SET telefono='${telefono}' WHERE idusuario=${idUsuario};`);
                    res.status(200).send({ telefono: telefono, message: "Se actualizó el telefono correctamente." });
                } else {
                    res.status(500).send({
                        message: 'Error: No se ha podido actualizar el dato del usuario.'
                    });
                }
                break;
            case 4:
                if (idUsuario && direccion) {
                    await conf.pool.query(`UPDATE public.usuario SET direccion='${direccion}' WHERE idusuario=${idUsuario};`);
                    res.status(200).send({ direccion: direccion, message: "Se actualizó la direccion correctamente." });
                } else {
                    res.status(500).send({
                        message: 'Error: No se ha podido actualizar el dato del usuario.'
                    });
                }
                break;
            default:
                res.status(404).send({
                    message: 'No se han enviado datos para actualizar.'
                });
                break;
        }
    },
    historialCompraPorUsuario: async function(req, res) {
        var idusuario = req.user.id;

        try {
            var a = 'SELECT idPedido, fecha, idproducto,nombre, precio_unitario, cantidad, subtotal ';
            var b = 'FROM SP_OBTENER_HISTORIAL_COMPRA_POR_USUARIO($1) AS (idPedido INT, fecha DATE, idproducto INT,nombre VARCHAR(45), precio_unitario NUMERIC, cantidad INT, subtotal NUMERIC);';

            var c = a + b;
            const response = await conf.pool.query(c, [parseInt(idusuario)]);
            var respuesta = response.rows;
            console.log(respuesta);
            return res.status(200).send(respuesta);

        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: 'Error: No se puede obtener esta informacón'
            })
        }
    }
};


module.exports = controller;