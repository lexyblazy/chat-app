var socket = io();
socket.on('connect', function () {
    console.log('Connected to server')
})

socket.on('message', function (message) {
    console.log(message);
    var formattedTime = moment(message.createdAt).format('h:mma');
    var li = $('<li></li>');
    li.text(` ${formattedTime} - From ${message.from}: ${message.text}`);
    $('#message-list').append(li)
})

socket.on('locationMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mma');
    var li = $('<li></li>');
    var a = $('<a target= "_blank">My Current Location<a>');
    li.text(`${formattedTime} - ${message.from}: `)
    a.attr('href', message.text);
    li.append(a);
    $('#message-list').append(li)


})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

var messageTextBox = $('#message-text');

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('message', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        
        messageTextBox.val('');
    });
   

})

var locationButton =  $('#location-button');

locationButton.on('click', function () {

    if (!navigator.geolocation) {
        return alert('Your browser does not support this feature')
    }
    
    locationButton.attr('disabled','disabled').text('Sending Location...')

    navigator.geolocation.getCurrentPosition(function (position) {
        
        location.removeAttr('disabled').texy('Send Location');
        socket.emit('createLocationMessage', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        })
    }, function (err) {
        console.log(err);
        location.removeAttr('disabled').text('Send Location');
    })
})
