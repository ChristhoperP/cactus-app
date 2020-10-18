'use strict'

const services = require('../services/token')

function isAuth(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({ verification: false, message: 'No tienes autorización: no se ha enviado cabecera.' })
    }

    const token = req.headers.authorization.split(" ")[1]
    if (token == 'null' || token === undefined) {
        return res.status(401).send({ verification: false, message: 'No tienes autorización: token undefined.' })
    }

    services.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status).send({ verification: false, message: response.message })
        })

}

function noAuth(req, res, next) {

    if (!req.headers.authorization) {
        next()
    } else {
        const token = req.headers.authorization.split(" ")[1]
        if (token == 'null' || token === undefined) {
            next()
        } else {
            services.decodeToken(token)
                .then(response => {
                    return res.status(403).send({ verification: false, message: 'No tienes autorización: ya has iniciado sesión.' })
                })
                .catch(response => {
                    next()
                })
        }
    }

}

function isAdmin(req, res, next) {

    if (!req.headers.authorization) {
        return res.status(403).send({ verification: false, message: 'No tienes autorización: no se ha enviado cabecera.' })
    }

    const token = req.headers.authorization.split(" ")[1]
    if (token == 'null' || token === undefined) {
        return res.status(401).send({ verification: false, message: 'No tienes autorización: token undefined.' })
    }

    services.decodeToken(token)
        .then(response => {

            if (response.rol!='admin') {
                return res.status(401).send({ verification: false, message: 'No tienes autorización: no tienes permisos de administrador.' })
            }

            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status).send({ verification: false, message: response.message })
        })

}

module.exports = { isAuth, noAuth, isAdmin }