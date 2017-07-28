const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketIO = require('socket.io')
const publicPath = path.join(__dirname, '../public');
const {messageGenerator} = require('../utils/message');
const  moment = require('moment');

var PORT = process.env.PORT || 3000;
var IP = process.env.IP;
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

app.get('/', (req, res) => {
    //    res.render('index.html');
})

io.on('connection', (socket) => {

    console.log('New User connected');

    socket.emit('message' , messageGenerator("Admin", "Welcome to chat app"));

    socket.broadcast.emit('message', messageGenerator("Admin", "New user joined"));

    socket.on('message', (message,callback) => {

        console.log('message from user', message);
        io.emit('message', messageGenerator(message.from, message.text))
        callback('This is from the server');

    })

    socket.on('createLocationMessage',(coords)=>{
        var locationUrl = `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
        io.emit('locationMessage', messageGenerator('Admin',locationUrl));
    })

    socket.on('disconnect', () => {
        console.log('Client Disconnected from server');
    })

})


server.listen(PORT, IP, () => {
    console.log('Server is up and running on port 3000');
})
