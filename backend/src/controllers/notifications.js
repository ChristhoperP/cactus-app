const pg = require('pg');
var EventEmitter = require('events');
var util = require('util');
var conf = require('../config');

var clients = [];

function DbEventEmitter() {
    EventEmitter.call(this);
}

util.inherits(DbEventEmitter, EventEmitter);
var dbEventEmitter = new DbEventEmitter;

dbEventEmitter.on('new_testevent', (msg) => {
    console.log('Nuevo producto registrado: ' + msg);
    controller.sendEventsToAll(msg);
});

dbEventEmitter.on('deleted_promo', (msg) => {
    console.log('Promocion eliminada: ' + msg);
    controller.sendEventsToAll(msg);
});

//let pgClient = new pg.Client('postgres://postgres:postgres@localhost:5432/cactus');

/*  conf.pool.connect(
     function(err, client) {
         if (err) {
             console.log(err);
         
         client.on('notification', function(msg) {
             console.log('Channel: ' + msg.channel);
             dbEventEmitter.emit(msg.channel, msg.payload);
         })
         client.query('LISTEN deleted_promo');
     }
    }
     );  */

var controller = {

    eventsHandler: function(req, res, next) {
        // Headers y Http status para mantener abierta la conexión
        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        };
        res.writeHead(200, headers);
        // Mensaje de prueba al iniciar la conexión
        const data = `data: {"mensaje": "Datos de prueba"}\n\n`;
        res.write(data);

        // Generar id del cliente para almacenar el res
        // en la lista de conexiones de clientes
        // para enviar las notificaciones posteriromente
        const clientId = Date.now();
        const newClient = {
            id: clientId,
            res
        };
        clients.push(newClient);

        // Se actualiza la lista de clientes al cerrar una conexion
        // de acuerdo al id del cliente
        req.on('close', () => {
            console.log(`${clientId} Connection closed`);
            clients = clients.filter(c => c.id !== clientId);
        });
    },

    // Iteración sobre la lista de clientes para enviar las notificaciones
    sendEventsToAll: function(msg) {
        clients.forEach(c => c.res.write(`data: ${msg}\n\n`));
        console.log('Se envió a los clientes');
    }
};

module.exports = controller;