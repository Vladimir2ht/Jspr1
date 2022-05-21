"use strict";

Send_request('GET')
	.then(data => Table_creator(data))

// Есть более современный вариант
function Send_request( method, body = null, poust = null ){
  const url = "http://localhost:3000/invoices";
  
  return new Promise((resolve, reject) => {
	let xhr = new XMLHttpRequest();
	if (body) {
	  xhr.open( method, url + body);
	} else {
	  xhr.open( method, url );
	};
	xhr.responseType = 'json';
	(method == "POST" || method == "PATCH") ? xhr.setRequestHeader('Content-Type', 'application/json') : null;
	xhr.onload = () => {
	  if (xhr.status < 400 ) {
		resolve(xhr.response);
	  } else {
		reject(xhr.response);
	  }
	}
	xhr.onerror = () => {
	  reject(xhr.response);
	};
  xhr.send(JSON.stringify(poust));
})
}

const colomns = [ 'date_created', 'number', 'date_supply', 'comment', ];
const list_of_doc = document.querySelector('tbody');

function Table_creator(arr_of_dokuments) {
  for (let number in arr_of_dokuments){
	let line = document.createElement('tr');
	
	// Переделать по DRY
	for (let i of colomns){
	  let sell = document.createElement('td');
	  sell.innerHTML = (arr_of_dokuments[number])[i];
	  
	  if (i == 'comment'){
		let tbuton = document.createElement('button');

		tbuton.innerHTML = 'Edit';
		tbuton.classList.add("tablebutton");
		tbuton.setAttribute('onclick', `Open_popup("/${(arr_of_dokuments[number])["id"]}")`);
		sell.prepend(tbuton);
		tbuton = document.createElement('button');
		tbuton.innerHTML = 'Delete';
		
		tbuton.setAttribute('onclick', `Asc_delation("/${(arr_of_dokuments[number])["id"]}")`);
		
		tbuton.style.backgroundColor = "red";
		tbuton.classList.add("tablebutton");
		sell.prepend(tbuton);
	  }
	  line.append(sell);
	}
	list_of_doc.append(line);
 } 	
}

function Asc_delation(id_delate) {
  Send_request("DELETE", id_delate, null,);
  Sort_and_serch(); //кажется не успевает
}

