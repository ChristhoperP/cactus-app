'use strict'

const { request } = require('express');
const { pool } = require('../conexion');
const bcrypt = require('bcrypt');
const rutas = require('../config');
const services = require('../services/token');


var controller = {
    getTiposBases: async function(req, res) {
        const response = await pool.query('SELECT idtipobase, descripcion FROM SP_OBTENER_TIPOSBASES() AS (idtipobase INT, descripcion VARCHAR(100))');
        res.json(response.rows);
    },
    getCategorias: async function(req, res) {
        const response = await pool.query('SELECT idcategoria, descripcion FROM SP_OBTENER_CATEGORIAS_PRODUCTOS() AS (idcategoria INT, descripcion VARCHAR(200));');
        res.json(response.rows);
    }
}


module.exports = controller;