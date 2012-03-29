var sys = require('util'),
    http = require('http'),
    fs = require('fs'),
    index;

function readFile(filename) { 
    var content = "hello";
    content = fs.readFileSync('./' + filename);
    return content;
}

http.createServer(function (request, response) {
  console.log(request.url);
  var result = request.url.match(/^\/(.*\.js)/);
  if(result) {
      response.writeHead(200, {'Content-Type': 'text/javascript'});
      response.write(readFile(result[1]));
  } else if(request.url.indexOf("add?&id=") != -1){
      var vals = request.url.split("=");
      console.log(vals[vals.length-1]);
      var playlist = fs.openSync("./playlist.csv", "a+");
      fs.writeSync(playlist, ", '" + vals[vals.length -1 ] + "'");
      fs.close(playlist);
  }
  else{
      var ifile = fs.openSync("./playlist.js", "w");
      var icontent = readFile("./playlist.csv");
      var list = "var playlist = [" + icontent + "];\n";
      console.log(list);
      fs.writeSync(ifile, list);
      fs.close(ifile);
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(readFile('index.html'));
  }
  response.end();
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');
