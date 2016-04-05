var net = require('net');
var fs = require('fs');

var currDate = new Date();
var timeStamp = currDate.toUTCString();
var successHead = 'HTTP/1.1 200 OK\n' + timeStamp + '\nServer: NatAttack';
var failHead = 'HTTP/1.1  404 NOT FOUND\n' + timeStamp + '\nServer: NatAttack';

var server = net.createServer(function (request) {
  request.on('data', function (data) {

    var statusLineUri = '.' + data.toString().split('\n')[0].split(' ')[1];
    fs.readFile(statusLineUri, function (err, data) {

      if (err) {
        request.write(failHead);
      }
      else {
        request.write(successHead + '\n\n' + data.toString());
      }

      request.end();
    });
  });
});

server.listen({port : 8080}, function () {
  var address = server.address();
});