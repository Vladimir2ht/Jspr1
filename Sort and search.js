"use strict";
const serch_object = document.querySelector("input");

serch_object.addEventListener("keydown", ({key}) => {
  if (key === "Enter"){   // Handle press
	Sort_and_serch();
  } 
})

function Need_sort(){
  let selects = document.querySelectorAll('select')[1];
  if (selects.selectedIndex != 0){Sort_and_serch()};
}
// Формирование строки запроса, так медленнее, но понятнее, запись короче, чем со строками(смотри ClearJS).
function Sort_and_serch(){
  const selects = document.querySelectorAll('select');
  let url = new URL(start_url);
  
  if (serch_object.value !== '' && selects[2].selectedIndex != 0){
	url.searchParams.append(`${colomns[selects[2].selectedIndex - 1]}` + '_like', serch_object.value)
	}
  if (selects[1].selectedIndex != 0) {
	url.searchParams.append('_sort', colomns[selects[0].selectedIndex]);
	url.searchParams.append('_order', ((selects[1].selectedIndex == 1) ? 'asc' : 'desc'));
  }
  if (serch_object.value !== '' && selects[2].selectedIndex == 0){
    url.searchParams.append('q', serch_object.value);
  }
  
  Table_deletor();
  Send_request('GET', url)
	.then(data => Table_creator(data))  
}

const table_body = document.querySelector('tbody');
// Имеет смысл функции заасинхронить и поставить выжидание,
// иначе DELETE и PUTCH не успевают примениться до Sort.
function Table_deletor() {
  table_body.innerHTML = "";
}

