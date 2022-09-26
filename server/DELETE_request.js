
const fs = require("fs");


exports.DELETE_function = function (url) {
	let db = fs.readFileSync('./server/db.json', 'utf-8');
	db = JSON.parse(db);
	url = url.slice(10);
	// Сложность N, возможно можно быстрее.
	db.invoices = db.invoices.filter(invoice => invoice.id !== url);
	// if (db.invoices.length !== length - 1) return console.log("Error id");		
	fs.writeFileSync('db.json', JSON.stringify(db));

	return JSON.stringify({});
	
};

