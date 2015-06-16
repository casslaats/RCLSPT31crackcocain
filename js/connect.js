"use strict";
var ip   = '192.168.1.100';
var port = 8080;
var server = require('../server/webServer').start(ip, port);
var io = require('../server/socketServer').start(server);
var serialPort = '/dev/tty.usbmodem1421';
var board = require('../server/firmataConnector').start(serialPort);


// Connect Arduino
board.on('connection', function () {
    
    // Set pins to output
    board.pinMode(13, board.OUTPUT);
    
    // WebSocket connection 
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
       




        
    function connectServer() {
        var socket = io('http://192.168.1.100:8080');
        
        socket.on('connect', function () {
                    console.log('The server is ready!');
        });
        
        socket.on('msg', function (data) {
            
            console.log(data);
            
            socket.emit('msg', shapeChoice); 
            //var shapeChoice is the variable you send to the server
        });
    }
  
