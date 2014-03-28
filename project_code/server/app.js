var fs=require('fs');
var config=JSON.parse(fs.readFileSync("../settings/configs.json"));
var express = require('express'),
    socketio = require('socket.io'),
    app = express();
    http = require('http');

app.use("/", express.static(__dirname));

var server = http.createServer(app);
var io = socketio.listen(server);
server.listen(config.app_port);

var main=require('./main')(config,io);

app.use(express.static(__dirname+'/'));
app.use(
	express.bodyParser(
		{uploadDir:'./uploads'}
	)
);

app.get('/',function(req,res){
	var content=fs.readFileSync("index.html");
	res.setHeader("Content-type","text/html");
	res.send(content)
});

var path=require("path");

app.post('/upload',function(req,res){
	var tempPath=req.files.file.path;
	targetPath=path.resolve('./uploads/'+req.files.file.name);
    var ext=path.extname(req.files.file.name).toLowerCase();
	
	if(ext==='.png'||ext==='.jpg'||ext==='.gif'){
		fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
            res.send(200);
        });
	}else {
        fs.unlink(tempPath, function (err) {
            if (err) throw err;
            console.error("Only Images are allowed!");
        });
    }
});
