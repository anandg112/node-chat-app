  var socket = io();

  socket.on('connect', function() {
    console.log('Connected to server');
  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });

  socket.on('newMsg', function(msg){
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    // console.log("New Message", msg);
    // var li = $('<li></li>');
    // li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
    //
    // $('#messages').append(li);
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      text: msg.text,
      from: msg.from,
      createdAt: formattedTime
    });
    $('#messages').append(html);
  });

  socket.on('newLocationMsg', function(msg){
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My current location</a>');
    // li.text(`${msg.from} ${formattedTime}: `);
    // a.attr('href', msg.url);
    // li.append(a);
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
      url: msg.url,
      from: msg.from,
      createdAt: formattedTime
    });
    $('#messages').append(html);
  });

$('#message-form').on('submit', function(e){
  e.preventDefault();
  var msgTextBox = $('[name=message]')
  socket.emit('createMsg', {
    from: 'User',
    text: msgTextBox.val()
  }, function () {
      msgTextBox.val('')
  });
});

var locationBtn = $('#send-location');
locationBtn.on('click', function(){
  if(!navigator.geolocation){
    return alert("Geolocation not supported by your browser");
  }
  locationBtn.attr('disabled', 'disabled').text("Sending location...");
  navigator.geolocation.getCurrentPosition(function(position){
    locationBtn.removeAttr('disabled').text('send location');
    socket.emit('createLocationMsg', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    locationBtn.removeAttr('disabled').text('send location');
    alert("Unable to fetch location.");
  });

});
