var net = require('net');

//sets variables for method/port/path/host
var method = process.argv[5] || 'GET';
var port = process.argv[2] || 8080;
var path = process.argv[4] || '/index.html';
var host = process.argv[3] || 'localhost';


//creates connection to server
var socket = net.createConnection(port, host, function () {
    console.log('poop');

    var date = new Date();
    date.toUTCString();

    socket.write(method + ' ' + path + ' HTTP/1.1\n');
    socket.write('Host: ' + host+'\n');
    // socket.write('Date: '+ date +'\n');
    // socket.write('Accept: ' + 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\n');
    socket.write('User-Agent: ' + 'blah\n\n');

//once data has been recieved
  socket.on('data', function (data){
    console.log(data.toString());
    socket.end();
  });

    socket.on('end', function () {
      console.log('frog');
    });
});

