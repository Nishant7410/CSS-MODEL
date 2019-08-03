var express = require('express')
var app = express()

var http = require('http')
var server = http.Server(app);

const socketIO = require('socket.io');
var io = socketIO(server);

var path = require('path')
var port = 8080;

//Express Middleware
app.use(express.json()); //A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body).
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, 'Public'))); // To serve static files
//ByDefault serve /public/index.html 


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });
  console.log("Connection Established");
//    socket.on('chat message', function(msg){
//       io.emit('chat message', msg);
//        });
//    socket.emit('chat message', 'hllo');
});
  
server.listen(8080 , ()=>{console.log(`Listening on Port ${port}`)})
