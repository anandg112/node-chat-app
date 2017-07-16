  var socket = io();

  socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createMsg', {
      to: 'anand@example.com',
      text: "How you doing!"
    });
  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });

  socket.on('newMsg', function(msg){
    console.log("New Message", msg);
  });
