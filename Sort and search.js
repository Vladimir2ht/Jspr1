"use strict";
// const serch_object = document.querySelector("input");

serch_feeld.addEventListener("keydown", ({key}) => {
  if (key === "Enter") {  // Handle press
	  Sort_and_serch();
  } 
})

const selects = document.querySelectorAll('select');

function Need_sort(){
  let select = selects[1];
  if (select.selectedIndex != 0){Sort_and_serch()};
}
// Формирование строки запроса, так медленнее, но понятнее, запись короче, чем со строками(смотри ClearJS).
function Sort_and_serch(){
  let url = new URL(start_url);
  
  if (serch_feeld.value !== '' && selects[2].selectedIndex != 0) {
  	url.searchParams.append(`${colomns[selects[2].selectedIndex - 1]}` + '_like', serch_feeld.value)
	}
  if (selects[1].selectedIndex != 0) {
  	url.searchParams.append('_sort', colomns[selects[0].selectedIndex]);
	  url.searchParams.append('_order', ((selects[1].selectedIndex == 1) ? 'asc' : 'desc'));
  }
  if (serch_feeld.value !== '' && selects[2].selectedIndex == 0) {
    url.searchParams.append('q', serch_feeld.value);
  }
  
  Table_deletor();
  Send_request('GET', url)
	  .then(data => Table_creator(data));
}

const table_body = document.querySelector('tbody');

function Table_deletor() {
  table_body.innerHTML = "";
}

