var net = require('net');
var fs = require('fs');

var currDate = new Date();
var timeStamp = currDate.toUTCString();
var passHead = 'HTTP/1.1 200 OK\n' + timeStamp + '\nServer: NatAttack';
var failHead = 'HTTP/1.1  404 NOT FOUND\n' + timeStamp + '\nServer: NatAttack';
var header405 = 'HTTP/1.1  405 METHOD NOT ALLOWED\n' + timeStamp + '\nServer: NatAttack';

var server = net.createServer(function (request) {

  request.on('data', function (data) {

    var statusLine = data.toString().split('\n')[0];
    var statusLineUri = '.' + statusLine.split(' ')[1];
    var statusLineMethod = statusLine.split(' ')[0];

    if (statusLineMethod !== 'GET' && statusLineMethod !== 'HEAD') {

      fs.readFile('./405.html', function (err, data) {

        if (err) {
          throw new Error(err);
        }
        else {
          request.write(header405 + '\n\n' + data.toString());
          console.log('yo',header405);
        }

        request.end();
      });
    }
    else {

      if (statusLineUri === './') {
        statusLineUri = './index.html';
      }

      fs.readFile(statusLineUri, function (err, data) {

        if (err) {

          return error404(request);
        }
        else {

          request.write(passHead + '\n\n' + data.toString());
        }

        request.end();
      });
    }
  });
});


server.listen({port : 8080}, function () {

  var address = server.address();
});


function error404 (request) {

  fs.readFile('./404.html', function (err, data) {

    if (err) {
      throw new Error(err);
    }
    else {
      request.write(failHead + '\n\n' + data.toString());
    }

    request.end();
  });
}