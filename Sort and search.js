"use strict";
let wordfeeld = document.getElementsByTagName("input");

wordfeeld[0].addEventListener("keydown", ({key}) => {
  if (key === "Enter"){   // Handle press
	sort_and_serch();
  } 
})

function need_sort(){
  let selects = document.querySelectorAll('select')[1];
  if (selects.selectedIndex != 0){sort_and_serch()};
}

// Формирование строки запроса, НЕПОНЯТНО, УПРОСТИТЬ! Зато максимально быстро.
function sort_and_serch(){
  let selects = document.querySelectorAll('select'); // document.forms не ловит select и input
  
  let request_string;
  var serch_object = document.querySelector('input');
  if (serch_object.value !== '') {
	if (selects[2].selectedIndex == 0) {
	  if (selects[1].selectedIndex != 0) {
		request_string = `?_sort=${colomns[selects[0].selectedIndex]
		}&_order=${(selects[1].selectedIndex == 1) ? 'asc' : 'desc'
		}&q=${serch_object.value}`;
	  } else {
		request_string = `?q=${serch_object.value}`;
	  }
	} else {
	  if (selects[1].selectedIndex != 0) {
		request_string = `?${colomns[selects[2].selectedIndex - 1]}_like=${
		serch_object.value}&_sort=${colomns[selects[0].selectedIndex]
		}&_order=${(selects[1].selectedIndex == 1) ? 'asc' : 'desc'}`;
	  } else {
		request_string = `?${colomns[selects[2].selectedIndex - 1]}_like=${serch_object.value}`;
	  } 
	}
  } else {
	if (selects[1].selectedIndex != 0) {
	  request_string = `?_sort=${colomns[selects[0].selectedIndex]
	  }&_order=${(selects[1].selectedIndex == 1) ? 'asc' : 'desc'}`;
	}
  }
  tabledeletor();
  send_request('GET', request_string)
	.then(data => tablecreator(data))  
}

function tabledeletor() {
  let tablebody = document.querySelector('tbody');
  tablebody.innerHTML = "";
}

