"use strict";
let colomns = [ 'date_created', 'number', 'date_supply', 'comment', ];

// Есть более современный вариант
function send_request( method, body = null, poust = null ){
  
  return new Promise((resolve, reject) => {
	let xhr = new XMLHttpRequest();
	let url = "http://localhost:3000/invoices";
	if (body) {
	  xhr.open( method, url + body);
	} else {
	  xhr.open( method, url );
	};
	xhr.responseType = 'json';
	(method == "POST") ? xhr.setRequestHeader('Content-Type', 'application/json') : null;
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

send_request('GET')
	.then(data => tablecreator(data))

function tablecreator(arr_of_dokuments) {
  let listofdoc = document.querySelector('tbody');
  
  // Можно сделать автогенерацию колонок по задающимся параметрам
  
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
		sell.prepend(tbuton);
		tbuton = document.createElement('button');
		tbuton.innerHTML = 'Delete';
		
		tbuton.setAttribute('onclick', `send_request("DELETE", "/${(arr_of_dokuments[number])["id"]}")`);
		
		tbuton.style.backgroundColor = "red";
		tbuton.classList.add("tablebutton");
		sell.prepend(tbuton);
	  }
	  line.append(sell);
	}
	listofdoc.append(line);
 } 	
}

function Button( method, body = null, poust = null ) {
  
  
  sort_and_serch()
  
    
}

