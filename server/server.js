const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketIO = require('socket.io')
const publicPath = path.join(__dirname,'../public');

var PORT = process.env.PORT || 3000;
var IP = process.env.IP;
app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

app.get('/',(req,res)=>{
//    res.render('index.html');
})

io.on('connection',(socket)=>{
    console.log('New User connected');
    
    socket.on('disconnect',()=>{
        console.log('Client Disconnected from server');
    })
})
server.listen(PORT,IP,()=>{
    console.log('Server is up and running on port 3000');
})