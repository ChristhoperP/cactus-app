'use strict'

const rutas = require('../config');

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Hello world!'
        });
    }
};

module.exports = controller;