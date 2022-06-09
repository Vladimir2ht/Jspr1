"use strict";

const start_url = "http://localhost:3000/invoices";

Send_request('GET')
	.then(data => Table_creator(data))

function Send_request(method, addres = start_url, poust = null){
  
  let response;
  if (poust) {
	response = fetch(addres, {
	  method: method,
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(poust)
	})
  } else {
	response = fetch(addres, {
	  method: method,
	})
  };
  return response.then(response => response.json())
};

const colomns = ['date_created', 'number', 'date_supply', 'comment',];
const list_of_doc = document.querySelector('tbody');

function Table_creator(arr_of_dokuments) {
  for (let number in arr_of_dokuments){
	let line = document.createElement('tr');
	
	// Переделать по DRY
	for (let i of colomns){
	  let sell = document.createElement('td');
	  
	  if (i == 'date_created' || i == 'date_supply') {
		let server_date = (arr_of_dokuments[number])[i]
		let normal_date = [server_date.slice(0, 4),
		server_date.slice(5, 7), server_date.slice(8)];
		
		normal_date.reverse();
 		sell.innerHTML = normal_date.join('.');
	  // Можно следующую проверку вынести отдельным if, так	будет 3 
	  // лишних сравнения. Было выбрано дублировать сторку с innerHTML.
	  } else if (i == 'comment'){
		sell.innerHTML = (arr_of_dokuments[number])[i];
		let tbuton = document.createElement('button');

		tbuton.innerHTML = 'Edit';
		tbuton.classList.add("tablebutton");
		tbuton.setAttribute('onclick', `Open_popup("/${(arr_of_dokuments[number])["id"]}")`);
		sell.prepend(tbuton);
		tbuton = document.createElement('button');
		tbuton.innerHTML = 'Delete';
		
		tbuton.setAttribute('onclick', `Asc_delation("/${(arr_of_dokuments[number])["id"]}")`);
		
		tbuton.classList.add("tablebutton", "redbutton");
		
		sell.prepend(tbuton);
	  } else {
		sell.innerHTML = (arr_of_dokuments[number])[i];
	  };
	  line.append(sell);
	}
	list_of_doc.append(line);
 } 	
}

function Asc_delation(id_delate) {
  Send_request("DELETE", start_url + id_delate, null,);
  Sort_and_serch(); //кажется не успевает
}

const theme_imgs = document.querySelectorAll('img');

function Switch_theme(is_dark) {
  
  if (is_dark) {
	thems_styles.media = 'all';
    theme_imgs[1].style.display = "none";
    theme_imgs[0].style.display = "block";
  } else {
	thems_styles.media = 'not all';
	theme_imgs[0].style.display = "none";
    theme_imgs[1].style.display = "block"; 
  }
}

function Theme_switcher(is_dark) {
  localStorage.dark_style = is_dark;
  Switch_theme(is_dark);
}

Switch_theme(
  (localStorage.dark_style == 'true') ? localStorage.dark_style : 
  matchMedia('(prefers-color-scheme: dark)').matches);



