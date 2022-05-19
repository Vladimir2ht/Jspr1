"use strict";

// МОЖНО упростить для этого сайта, должно работать на все поля.
let commentarea = document.getElementsByTagName("textarea");
for (let i = 0; i < commentarea.length; i++) {
  commentarea[i].setAttribute("style", "height:" + (commentarea[i].scrollHeight) + "px;");
  commentarea[i].addEventListener("input", OnInput, false);
}
function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}


// document.getElementById("popup_body") можно вынести для экономии мощьности
function Open_popup(goal) {
  popup_body.style.display = "block";
  commentarea[0].setAttribute("style", "height:" + "40px;");
  
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
  var form_data = new FormData(forom);
  let doc_info = Object.fromEntries(form_data.entries());
  send_request('POST', null ,doc_info)	
  Close_popup();
  
}