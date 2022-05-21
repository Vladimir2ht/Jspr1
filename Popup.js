"use strict";

const comment_area = document.getElementsByTagName("textarea")[0];

  comment_area.setAttribute("style", "height:" + (comment_area.scrollHeight) + "px;");
  comment_area.addEventListener("input", On_Input, false);

function On_Input() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}

const pop_head = document.querySelector("h4");
let id_inwork

function Open_popup(id_patch = null) {
  (id_patch) ? pop_head.innerHTML = 'Edit Invoice' : pop_head.innerHTML = 'Create Invoice';
    
  popup_body.style.display = "block";
  comment_area.setAttribute("style", "height:" + "40px;");
  id_inwork = id_patch;
  popup_body.addEventListener("click", function (click){
	if (!click.target.closest('#popup_font')) {
	  Close_popup();
	}
  });
}

function Close_popup() {
  popup_body.style.display = "none";
  forom.reset();
}

function Post_request(event) {
  event.preventDefault();
    
  let form_data = new FormData(forom);
  // Да, до преобразований form_data выглядит как пустое.
  let doc_info = Object.fromEntries(form_data.entries());
  if (id_inwork){
	Send_request('PATCH', id_inwork, doc_info)	
  } else { //Мжно и в строчку, так понятнее.
	Send_request('POST', null, doc_info)	
  }
  Close_popup();
  Sort_and_serch()
}

function Input_numbers(event) {
  if ( event.key == 'Backspace' || event.key == 'Delete' 
  || event.key == 'Tab' || event.key == 'ArrowLeft' || event.key == 'ArrowRight' || (/^[0-9]$/.test(event.key))){
  } else{
	event.preventDefault();
	cosole.log(event.key);
  };
}// Разрешить удаление


