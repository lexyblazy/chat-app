var socket = io();
socket.on('connect', function () {
    console.log('Connected to server')
})

socket.emit('sendEmail',{
    from: "client@email.com",
    to:"server@email.com",
    text:"Hello there"
});

socket.on('receiveEmail',(email)=>{
    console.log('New email for you \n',email);
})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})
