/**
 * Created by furka on 08.10.2016.
 */

const port = 8080;
const serverUrl = "127.0.0.1";

const http = require("http");
const path = require("path");
const fs = require("fs");

console.log("Starting web server at " + serverUrl + ":" + port);

http.createServer( function(req, res) {
    var now = new Date();

    var filename = req.url || "index.html"
    var ext = path.extname(filename);
    var localPath = __dirname;
    var validExtensions = {
        ".html" : "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".txt": "text/plain",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".png": "image/png"
    };
    var isValidExt = validExtensions[ext];

    if (isValidExt) {
        localPath += filename;
        path.exists(localPath, function(exists) {
            if(exists) {
                console.log("Serving file: " + localPath);
                getFile(localPath, res, isValidExt);
            } else {
                console.log("File not found: " + localPath);
                res.writeHead(404);
                res.end();
            }
        });
    } else {
        console.log("Invalid file extension detected: " + ext)
    }

}).listen(port, function(){
    console.log("Server listening on: http://localhost:%s", port);
});

function getFile(localPath, res, mimeType) {
    fs.readFile(localPath, function(err, contents) {
        if(!err) {
            res.setHeader("Content-Length", contents.length);
            res.setHeader("Content-Type", mimeType);
            res.statusCode = 200;
            res.end(contents);
        } else {
            res.writeHead(500);
            res.end();
        }
    });
}