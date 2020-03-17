const select_type = document.getElementById("select_type");

function addChat_click() {

  const chkPosition = document.querySelector('input[name="chk_position"]:checked').value;	
  const chkId = document.querySelector('input[name="chk_position"]:checked').userId;
  const selectType = select_type.options[select_type.selectedIndex].value
  const inputMsg = inputChat.value;
  console.log(">>>chkName : "+ document.querySelector('input[name="chk_position"]:checked').userId);
  
  //채팅 저장 
  chatObjArr.push({ position:chkPosition ,type:selectType , userId: chkId, msg: inputMsg, sendYn: false});

  //저장된 채팅 표시 
  chatObjArr.forEach(function(chatObj){
    console.log( JSON.stringify(chatObj ));
  });
  
  
  //메세지 채팅창에 표시 
  sendNextChat();
  
  //입력창 초기화
  inputChat.value = "";
  
}


// //파일 업로드 
// const browseBtn = document.querySelector('.browse-btn');
// const realInput = document.querySelector('#real-input');

// browseBtn.addEventListener('click',()=>{
// 	realInput.click();
// });



function init(){
  // console.log(">>>>>>>>ㅇㅕ기어연ㅇ");
  
}

init();




// if (cnt > 0) {
// 				optVal += "<option value='" + category[i][cnt] + "'>" + category[i][cnt] + "</option>";
// 				console.log(optVal);
// 				$('select[name="choice_opt"]').append(optVal);
// 			}
