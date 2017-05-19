/***********************************/
/*   Set up the static server      */
/* Include static file web library */
var static = require('node-static');

/* Include http server library */
var http = require('http');

/* Assume we are running on Heroku */
var port = process.env.PORT;
var directory = __dirname + '/public';

/* If we aren't on Heroku, then we need to adjust the port and directory conformation and we know that because port won't be set */
if (typeof port == 'undefined' || !port){
  directory = './public';
  port = 8080;  
}
  
  /* Set up a static web server which wil deliver files from the filesystem */
  var file = new static.Server(directory);
  
  /* Construct an http server that gets files form the file server */
  var app = http.createServer(
    function(request,response){
      request.addListener('end',
        function(){
          file.serve(request,response);
          }
       ).resume();
    }
  ).listen(port); 
         
  console.log('The server is running.');

  /*************************************/
  /*   Set up the web socket server    */

  var io = require('socket.io').listen(app);

  io.sockets.on('connection',function (socket) {
    function log(){
      var array = ['*** Server Log Message: '];
      for(var i = 0; i < arguments.length; i++){
        array.push(arguments[i]);
        console.log(arguments[i]);
      }
      socket.emit('log',array);
      socket.broadcast.emit('log',array);
    }
  
  log('A web site connected to the server');
  socket.on('disconnect',function(socket){
    log('A web site disconnected from the server');
  });
  });