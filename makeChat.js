const select_type = document.getElementById("select_type");

function addChat_click() {

  const chkPosition = document.querySelector('input[name="chk_position"]:checked').value;	
  const chkId = document.querySelector('input[name="chk_position"]:checked').id;
  const selectType = select_type.options[select_type.selectedIndex].value
  const inputMsg = inputChat.value;
  console.log(">>>chkName : "+ document.querySelector('input[name="chk_position"]:checked').id);
  
  //채팅 저장 
  chatObjArr.push({ position:chkPosition ,type:selectType , id: chkId, msg: inputMsg, sendYn: false});

  //저장된 채팅 표시 
  chatObjArr.forEach(function(chatObj){
    console.log( JSON.stringify(chatObj ));
  });
  
  
  //메세지 채팅창에 표시 
  sendNextChat();
  
  //입력창 초기화
  inputChat.value = "";
  
}


function init(){
  // console.log(">>>>>>>>ㅇㅕ기어연ㅇ");
}

init();




// if (cnt > 0) {
// 				optVal += "<option value='" + category[i][cnt] + "'>" + category[i][cnt] + "</option>";
// 				console.log(optVal);
// 				$('select[name="choice_opt"]').append(optVal);
// 			}
