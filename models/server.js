//servidor de express
const express= require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer( this.app );

        //configuracion del socket server
       this.io = socketio( this.server, {});
    }

    middlewares() {
        //desplegar el directorio publico
        this.app.use( express.static( path.resolve( __dirname, '../public')));
    }

    configurarSockets() {
        new Sockets( this.io);
    }

    excute() {
        //inicializar middlewares
        this.middlewares();

        //configurar sockets
        this.configurarSockets()

        //inicializar el server
        this.server.listen(this.port, () =>{
            console.log('Server correindo en el puerto: ', this.port);
        })
    }
}

module.exports = Server;