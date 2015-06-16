"use strict";

var socketIO = require('socket.io');

exports.start = function (httpServer) {
    
    var io = socketIO(httpServer);
    io.serveClient(true);
    
    var magenta  = '\u001b[35m';
    var green    = '\u001b[32m';
    var red      = '\u001b[31m';
    var reset    = '\u001b[0m';
    
    console.log(green +"Socket Server ready!");
    console.log(reset);
    
    return io;
}

