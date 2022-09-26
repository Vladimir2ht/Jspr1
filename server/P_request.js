
const fs = require("fs");

const letters = "abcdefghijklmnopqrstuvwxyz0123456789";

exports.P_function = function (req, res) {
	let db = fs.readFileSync('./server/db.json', 'utf-8');
	db = JSON.parse(db);
    
	let body = "";
	req.on("data", chunk => {
		body += chunk.toString();
	})
	req.on("end", () => {
		body = JSON.parse(body);
		body.number = +body.number;
		
		if (req.method === "POST") {
			let id_word = "";
			for (let i = 0; i < 24; i++) {
				id_word += letters.charAt(Math.floor(Math.random() * letters.length));
			}
			body.id = id_word;
			db.invoices.push(body);
		} else {
			let index = req.url.slice(10);
			body.id = index;
			index = db.invoices.findIndex(invoice => invoice.id === index);
			db.invoices[index] = body;
			if (index < 0) return console.log("Error id");
		}

		fs.writeFileSync('db.json', JSON.stringify(db));

		res.end(JSON.stringify(body));
	});
};

