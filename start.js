"use strict";

const serverURL = "http://localhost:3000/invoices";
let xhr = new XMLHttpRequest();

let invoices = {};

xhr.open( 'GET' , serverURL);

xhr.responseType = 'json';

xhr.onload = () => {
	invoices = xhr.response;
	console.log(xhr.response);
	return(xhr.response);
}



xhr.send();


console.log(invoices);



