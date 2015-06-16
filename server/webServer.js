"use strict";

var http     = require('http');
var fs       = require('fs');
var path     = require('path');

var IP;
var PORT = process.env.PORT || 5000;

var SITE_ROOT = 'www';
var _INDEX    = '/index.html';
var _404      = '/404.html';

var magenta = '\u001b[35m';
var green    = '\u001b[32m';
var red      = '\u001b[31m';
var reset    = '\u001b[0m';


SITE_ROOT = './'+ SITE_ROOT;
var redirectLoop = 0;

var server = http.createServer(function (request, response) {
    
    var filePath = SITE_ROOT + (path.normalize(request.url)).toLowerCase();
    
    if (filePath == SITE_ROOT+'/') filePath = SITE_ROOT + _INDEX;
    
    var extname = path.extname(filePath);
    var contentType;
    
    switch (extname) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.htm':
            contentType = 'text/html';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;            
        case '.ttf':
            contentType = 'application/x-font-ttf';
            break;
        case '.eot':
            contentType = 'application/vnd.ms-fontobject';
            break;
        case '.woff':
            contentType = 'application/x-font-woff';
            break;
        case '.otf':
            contentType = 'application/x-font-otf';
            break;            
        case '.mp4':
            contentType = 'video/mp4';
            break;
        case '.ogv':
            contentType = 'video/ogg';
            break;
       case '.json':
           contentType = 'application/json';
           break; 
        case '.swf':
            contentType = 'application/x-shockwave-flash';
            break;
        case '.zip':
            contentType = 'application/zip';
            break;
        case '.rar':
            contentType = 'application/x-rar-compressed';
            break;
        case '.pdf':
            contentType = 'application/pdf';
            break;
        case '.docx':
            contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            break;
        case '.bin':
            contentType = 'application/octet-stream';
            break;
        default:
            contentType = 'text/plain';
    }
    
    fs.exists(filePath, function (exists) {
        
        if (exists) {
        
            fs.readFile(filePath, function (error, content) {

                if (error) {
                    response.writeHead(500);
                    response.end();

                } else {
                    response.writeHead(200, { 'Content-Type': contentType});
                    response.end(content, 'utf-8');
                }
                redirectLoop = 0;
            });

        } else {
            
            var regex = new RegExp("text/html");
            var rhc = request.headers.accept;
            var acceptHTML = rhc.match(regex);
            
            if(!acceptHTML) {
                response.writeHead(404);
                response.end();
                return;
            }
            
            switch (redirectLoop) {
                
                case 0: 
                        response.writeHead(302, {'Location': _404});
                        break;
                        
                case 1: 
                        response.writeHead(302, {'Location': _INDEX});
                        break;
                
                default:
                        response.writeHead(404);
                        break;
            }
            response.end();
            redirectLoop++;
        }
    });
});


exports.start = function (ip, port) {
    
    if(ip) IP = ip;
    if(port) PORT = port;
    
    server.listen(PORT, IP);
    
    if(ip) {
        console.log(magenta + 'Server running at: ' + reset + 'http://' + IP + ':' + PORT + '/');
    }else{
        console.log(magenta + 'Server running at: ' + reset + 'http://localhost:' + PORT + '/');
    }
    
    return server;
}

