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