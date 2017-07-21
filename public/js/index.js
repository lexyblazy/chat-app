var socket = io();
socket.on('connect', function () {
    console.log('Connected to server')
})

socket.on('message',function (message){
    console.log(message);
})

socket.on('newUser',function(message){
    console.log('From ' + message.from + ':\n' + message.text )
})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})
