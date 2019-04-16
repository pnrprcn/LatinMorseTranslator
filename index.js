
var app = require('express')();
var http = require('http').createServer(app);
var io = new require('socket.io')(http);
var morsify = require('morsify');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/index.html', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/index2.html', function(req, res){
    res.sendFile(__dirname + '/index2.html');
});

io.on('connection', function(socket){
    console.log('an user connected');
    socket.on('chat message', function(msg){
        msg2 = morsify.encode(msg);
        socket.emit('chat message2',msg2);

    });
    socket.on('morse message', function(msg){
        msg2 = morsify.decode(msg);
        socket.emit('morse message2',msg2);

    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

});






http.listen(3000, function(){
    console.log('listening on *:3000');
});
