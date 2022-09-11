const http = require("http");
const fs = require("fs");
const GET_module = require('./GET_request.js');
const DELETE_module = require('./DELETE_request.js');
const P_module = require('./P_request.js');

const page = fs.readFileSync('main.html', 'utf-8');
const css = fs.readFileSync('main.css', 'utf-8');
const css_dark = fs.readFileSync('Dark_Theme.css', 'utf-8');
const sun = fs.readFileSync('sun.png');
const moon = fs.readFileSync('moon.png');
const ico = fs.readFileSync('office.ico');
const script_start = fs.readFileSync('start.js', 'utf-8');
const script_sort = fs.readFileSync('Sort and search.js', 'utf-8');
const script_popup = fs.readFileSync('Popup.js', 'utf-8');

// console.log(GET_module);
const requestListener = function (req, res) {
	console.log(req.url);
	console.log(req.method);
	// console.log(req);
	res.writeHead(200);
	switch (req.method) {
		case 'GET':

			switch (req.url) {
				case '/':
					res.end(page);
					break;
				case '/main.css':
					res.end(css);
					break;
				case '/Dark_Theme.css':
					res.end(css_dark);
					break;
				case '/sun.png':
					res.end(sun);
					break;
				case '/moon.png':
					res.end(moon);
					break;
				case '/office.ico':
					res.end(ico);
					break;
				case '/start.js':
					res.end(script_start);
					break;
				case '/Sort%20and%20search.js':
					res.end(script_sort);
					break;
				case '/Popup.js':
					res.end(script_popup);
					break;
				default:
					res.end(GET_module.GET_function(req.url));
				// default '/invoices':
			}
			break;
		
		case 'PATCH':
		case 'POST':
			P_module.P_function(req, res);
			break;
		case 'DELETE':
			res.end(DELETE_module.DELETE_function(req.url));
			break;
	};
};
// Рассмотреть другие варианты синтаксиса всего сервера.
const server = http.createServer(requestListener);
server.listen(3000, 'localhost', () => {
    console.log(`Server is running on http://localhost:3000`);
});
