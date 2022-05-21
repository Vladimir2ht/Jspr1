"use strict";
const serch_object = document.querySelector("input");

serch_object.addEventListener("keydown", ({key}) => {
  if (key === "Enter"){   // Handle press
	Sort_and_serch();
  } 
})

// Формирование строки запроса, НЕПОНЯТНО, УПРОСТИТЬ! Зато максимально быстро.
function Sort_and_serch(){
  const selects = document.querySelectorAll('select');
  
  if (selects[1].selectedIndex == 0) {return null};
  
  let request_string;
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
  Table_deletor();
  Send_request('GET', request_string)
	.then(data => Table_creator(data))  
}

const table_body = document.querySelector('tbody');
// Имеет смысл функции заасинхронить и поставить выжидание,
// иначе DELETE и PUTCH не успевают применитьсядо Sort.
function Table_deletor() {
  table_body.innerHTML = "";
}

