var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/public/desktop'));
app.use('/mobile', express.static(__dirname + '/public/mobile'));

io.on('connection', function(socket){
    socket.on('mobile connected', function(){
      console.log('Mobile connected');
      io.emit('start')
    })

    socket.on('orientation', function(e){
      console.log('Orientation change');
      io.emit('mobile orientation', e);
    })
})

http.listen(process.env.PORT || 3000);