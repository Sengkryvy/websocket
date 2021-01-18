//Make connection
var socket = io.connect('http://127.0.0.1:4000/');

// Query DOM
var output = document.getElementById('output'),
    handle = document.getElementById('handle'),
    message = document.getElementById('message'),
    send = document.getElementById('send'),
    feedback = document.getElementById('feedback');

// Add EvenListener ------------------------------------

// On button "Send" is clicked
send.addEventListener('click', function() {
    socket.emit('chat', {
        handle: handle.value,
        message: message.value
    });
    message.value = '';
});

// On typing, broadcast to other connected-users
message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value);
});


// Listen to even -----------------------------------------

// On chat obj is emitted, display message on the output DOM
socket.on('chat', (data) => {
    outputStr = '<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>';
    output.innerHTML += outputStr;
    feedback.innerHTML = '';
});

// On someone is typing, display it on the screen
socket.on('typing', function(data) {
    typingStr = '<p><em>' + data + ' is typing...' + '</em></p>';
    feedback.innerHTML = typingStr;             
});