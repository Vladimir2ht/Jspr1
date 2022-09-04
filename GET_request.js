
const fs = require("fs");

exports.GET_function = function (url) {
	let db = fs.readFileSync('db.json', 'utf-8');
	db = JSON.parse(db).invoices;
	// console.log(db);
	// console.log(url);
	if (url === '/invoices') return JSON.stringify(db);
	let url_obj = new URL(url, "http://localhost:3000");

	console.log(url_obj.searchParams);

	if (url_obj.searchParams.has('q')) {
		let need = url_obj.searchParams.get('q');
		let need_reg_exp = new RegExp(`${need}`);
		let is_need_number = !isNaN(+need);

		db = db.filter((obj) => {
			if (is_need_number) {
				let response = obj.number;
				response = need_reg_exp.test("" + response);
				if (response) return true;
			}
			if (
				need_reg_exp.test(obj.date_created) ||
				need_reg_exp.test(obj.comment) ||
				need_reg_exp.test(obj.date_supply)
			)	return true;
			return false;
		});

	} else if (/_like/.test(url)) {
		let where = url.match(/(?<=\?).+(?=_like)/)[0];
		let need = url_obj.searchParams.get(where + "_like");
		let need_reg_exp = new RegExp(`${need}`);
		if (where === "number") {
			db = db.filter((obj) => need_reg_exp.test("" + obj[where]));
		} else {
			db = db.filter((obj) => need_reg_exp.test(obj[where]));
		};
	};
	return JSON.stringify(db);


};

