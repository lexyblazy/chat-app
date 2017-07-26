var socket = io();
socket.on('connect', function () {
    console.log('Connected to server')
})

socket.on('message',function (message){
    console.log(message);
    var li = $('<li></li>');
    li.text(`From ${message.from}: ${message.text}`);
    $('#message-list').append(li)
})


socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

$('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('message',{
        from:'User',
        text: $('#message-text').val()
    },function(){
        
    });
    $('#message-text').val('');
    
})

$('#location-button').on('click',function(){
    
    if(!navigator.geolocation){
        return alert('Your browser does not support this feature')
    }
    
    navigator.geolocation.getCurrentPosition(function (positon){
        console.log(positon)
    },function(err){
        console.log(err);
        console.log('cannnot find position')
    })
})