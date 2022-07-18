"use strict";

const comment_area = document.getElementsByTagName("textarea")[0];
comment_area.setAttribute("style", "height:" + (comment_area.scrollHeight) + "px;");
comment_area.addEventListener("input", On_Input, false);

function On_Input() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}

popup_body.addEventListener("click", function (click){
  if (!click.target.closest('#popup_font')) {
	Close_popup();
  }
});

const pop_head = document.querySelector("h4");
let id_in_work

function Open_popup(id_patch = null) {
  (id_patch) ? pop_head.innerHTML = 'Edit Invoice' : pop_head.innerHTML = 'Create Invoice';
  // id_in_work = null;
  popup_body.style.display = "block";
  comment_area.setAttribute("style", "height:" + "40px;");
  id_in_work = id_patch;
}

function Close_popup() {
  popup_body.style.display = "none";
  forme.reset();
}

function Post_request(event) {
  event.preventDefault();
    
  let form_data = new FormData(forme);
  // Не получилось нормально отправить данные в виде FormData.
  // Да, до преобразований form_data выглядит как пустое.
  let doc_info = Object.fromEntries(form_data.entries());
  let form_method;
  // Можно обойтись без новой переменной. Переприсваивание form_data
  // при далнейшей работе могло бы привести к запутыванию
  if (id_in_work) {
	form_method = 'PATCH';
	id_in_work = start_url + id_in_work;
  } else {
	form_method = 'POST';
	id_in_work = start_url;
  }
  Send_request(form_method, id_in_work, doc_info);	
	//Sort не всегда срабатывает, и при такой записи, и B then.
  Sort_and_serch();
  Close_popup();
}

function Input_numbers(event) {
  if ( event.key == 'Backspace' || event.key == 'Delete' || event.key == 'Tab'
    || event.key == 'ArrowLeft' || event.key == 'ArrowRight' || (/^[0-9]$/.test(event.key))){
  } else{
	event.preventDefault();
  };
};


