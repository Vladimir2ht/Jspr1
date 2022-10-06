"use strict";
// const serch_object = document.querySelector("input");

serch_feeld.addEventListener("keydown", ({key}) => {
  if (key === "Enter") Sort_and_serch(); // Handle press
})

const selects = document.querySelectorAll('select');

function Need_sort() {
  let select = selects[1];
  if (select.selectedIndex != 0) Sort_and_serch();
}
// Формирование строки запроса, НЕПОНЯТНО, УПРОСТИТЬ! Зато максимально быстро.
function Sort_and_serch(){
  if (selects[1].selectedIndex == 0) {return null};
  
  let request_string;
  if (serch_feeld.value !== '') {
  	if (selects[2].selectedIndex == 0) {
	    if (selects[1].selectedIndex != 0) {
    		request_string = `?_sort=${colomns[selects[0].selectedIndex]
	    	}&_order=${(selects[1].selectedIndex == 1) ? 'asc' : 'desc'
		    }&q=${serch_feeld.value}`;
  	  } else {
    		request_string = `?q=${serch_feeld.value}`;
	    }
  	} else {
  	  if (selects[1].selectedIndex != 0) {
    		request_string = `?${colomns[selects[2].selectedIndex - 1]}_like=${
    		serch_feeld.value}&_sort=${colomns[selects[0].selectedIndex]
		    }&_order=${(selects[1].selectedIndex == 1) ? 'asc' : 'desc'}`;
  	  } else {
	    	request_string = `?${colomns[selects[2].selectedIndex - 1]}_like=${serch_feeld.value}`;
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
function Table_deletor() {
  table_body.innerHTML = "";
}

