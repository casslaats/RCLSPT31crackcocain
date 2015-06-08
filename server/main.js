"use strict";
// start the webServer
var ip   = '192.168.1.100';
var port = 8080;
var server = require('./webServer').start(ip, port);
var io = require('./socketServer').start(server);
var serialPort = '/dev/tty.usbmodem1421';
var board = require('./firmataConnector').start(serialPort);


// Arduino is connected
board.on('connection', function () {
    
    // Set pin 13 to output
    board.pinMode(13, board.OUTPUT);
    
    // WebSocket connection handler
    io.sockets.on('connection', function (socket) {
        socket.emit('msg', 'hello new user');
        console.log('client connected: '+ socket.id);
        socket.on('msg', function (data) {
            if (data == 'triangle') {
                board.digitalWrite(13, board.HIGH);
                console.log(data);
            }
            else if (data == 'square') {
                board.digitalWrite(13, board.HIGH);
                console.log(data);
            }
            else if (data == 'circle') {
                board.digitalWrite(13, board.HIGH);
                console.log(data);
            }
            else{
                console.log('nee');
            }
            });

        socket.on('disconnect', function () {
            
            console.log('client disconnected: '+ socket.id);
            board.digitalWrite(13, board.LOW);
        });
    });
});
       




// // client connection handler
// io.on('connection', function (socket) {
    
//     console.log('client connected: ' + socket.id);
    
//     // send message to the current client
//     socket.emit('msg', 'hello new user');
    
//     // client disconnect handler
//     socket.on('disconnect', function () {

//         console.log('client disconnected: ' + socket.id);
//     });
// });
// arduino.on('connection', function () {
    
//     console.log("successfully connected to the Arduino!");
// });