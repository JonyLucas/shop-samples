let http = require('http');
let fs = require('fs'); 

http.createServer( (req, resp) => {
	
	if(req.url === "/"){
		fs.readFile('index.html', 'utf-8', (err, data) => {
			resp.writeHead(200, {'Content-Type': 'text/html'});
			resp.write(data);
			resp.end();
		});
	}
	else if(req.url === "/index.css"){

		fs.readFile('index.css', 'utf-8', (err, data) => {
			resp.writeHead(200, {'Content-Type': 'text/css'});
			resp.write(data);
			resp.end();
		});
	}
	else if(req.url === "/index.js"){
		fs.readFile('index.js', 'utf-8', (err, data) => {
			resp.writeHead(200, {'Content-Type': 'text/javascript'});
			resp.write(data);
			resp.end();
		});
	}
	else if(req.url.endsWith(".jpg")){
		fs.readFile('.' + req.url, (err, data) => {
			resp.writeHead(200, {'Content-Type': 'image/jpeg'});
			resp.write(data);
			resp.end();
		});
	}
} ).listen(8080);


