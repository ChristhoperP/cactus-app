'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(id,rol) {
    const payload = {
        sub: id,//el contenido del token
        rol: rol,//guarda el rol del usuario
        iat: moment().unix(),//fecha inicio
        exp: moment().add(14, 'days').unix()//fecha de exp
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            
            if(payload.exp <= moment().unix()){ //Verifica si el token ha caducado
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }

            resolve({id: payload.sub, rol: payload.rol})

        } catch (error) {
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })

    return decoded
}

module.exports = {createToken, decodeToken}