var socket = io();

function scrollToBottom(){
  var messages = $('#message-list');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
      console.log('SHould scroll');
      messages.scrollTop(scrollHeight);
  }
}
socket.on('connect', function () {
    console.log('Connected to server')
})

socket.on('message', function (message) {
    console.log(message);
    var formattedTime = moment(message.createdAt).format('h:mma');
    var template = $('#message-template').html();
    var html = Mustache.render(template,{
        from:message.from,
        text:message.text,
        createdAt:formattedTime
    })
     $('#message-list').append(html)
     scrollToBottom();
})

socket.on('locationMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mma');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template,{
        from:message.from,
        text:message.text,
        createdAt:formattedTime
    })

    $('#message-list').append(html);
    scrollToBottom();


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
