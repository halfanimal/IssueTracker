/**
 * Created by furka on 08.10.2016.
 */

const http = require('http')
const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('It works!! Path Hit: ' + req.url + '\n');
});
server.listen(8080, function(){
    console.log('ready captain!');
});