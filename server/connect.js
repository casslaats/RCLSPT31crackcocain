
        
    function connectServer() {
      // var shapeChoice = 'triangle';
        var socket = io('http://192.168.1.100:8080');
        
        // 
        socket.on('connect', function () {
                    console.log('The server is ready!');
        });
        
        // on msg
        socket.on('msg', function (data) {
            
            // log the message
            console.log(data);
            
             // send message
            socket.emit('msg', shapeChoice); //if om te versturen
        });
    }
  
