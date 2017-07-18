  var socket = io();

  socket.on('connect', function() {
    console.log('Connected to server');
  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });

  socket.on('newMsg', function(msg){
    console.log("New Message", msg);
    var li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`)

    $('#messages').append(li);
  });

  socket.on('newLocationMsg', function(msg){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    li.text(`${msg.from}: `);
    a.attr('href', msg.url);
    li.append(a);
    $('#messages').append(li);
  });

$('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMsg', {
    from: 'User',
    text: $('[name=message]').val()
  }, function () {

  });
});

var locationBtn = $('#send-location');
locationBtn.on('click', function(){
  if(!navigator.geolocation){
    return alert("Geolocation not supported by your browser");
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMsg', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    alert("Unable to fetch location.");
  });

});
