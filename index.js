var express = require('express');
const { on } = require('nodemon');
var socket = require('socket.io');

//Setup the Application
var app = express();
var server = app.listen(4000, function(){
    console.log('listening to request on port 4000');
});

//Static file
app.use(express.static('public'));

//Setup socket
var io = socket(server);

//On connection is established, do your things
io.on('connection', function(socket) {
    console.log('made socket connection', socket.id);

    //On chat is emitted, broadcast message obj to all connected socket
    socket.on('chat', function(data) {
        io.sockets.emit('chat', data);
    });
    
    //On a user is typing, show it to other user
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
});