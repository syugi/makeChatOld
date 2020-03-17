const profileList   = document.querySelector(".profileList"),
chatTextList   = document.querySelector(".chatTextList"),
select_type = document.getElementById("select_type");

let profiles = [];
let chats    = [];

/**
 * 채팅 추가 
 */
 
function addChat_click() {

  const chkPosition = document.querySelector('input[name="chk_position"]:checked').value;	
  const chkId = document.querySelector('input[name="chk_position"]:checked').id;
  const selectType = select_type.options[select_type.selectedIndex].value
  const inputMsg = inputChat.value;
  console.log(">>>chkName : "+ document.querySelector('input[name="chk_position"]:checked').userId);
  
  //채팅 저장 
  const chatObj = {
      position : chkPosition 
    , type     : selectType 
    , profileId   : chkId
    , msg      : inputMsg
  }
  
  chats.push({ position:chkPosition ,type:selectType , userId: chkId, msg: inputMsg, sendYn: false});

  //저장된 채팅 표시 
   console.log( JSON.stringify(chatObjArr));
  // chatObjArr.forEach(function(chatObj){
  //   console.log( JSON.stringify(chatObj ));
  // });
  
  
  //메세지 채팅창에 표시 
  //sendNextChat();
  
  //addChatTextList(profId, pos, type, msg)
  
  //입력창 초기화
  inputChat.value = "";
  
}

/**
 * 채팅 리스트 추가 
 */
function addChatTextList(profId, pos, type, msg){
  
  const li       = document.createElement("li");
  const posSpan  = document.createElement("span");
  const typeSpan = document.createElement("span");
  const msgSpan  = document.createElement("span");
  
  // nameSpan.innderText = name;
  posSpan.innderText = pos;
  typeSpan.innderText = type;
  msgSpan.innderText = msg;
  
  // li.appendChild(nameSpan);
  li.appendChild(posSpan);
  li.appendChild(typeSpan);
  li.appendChild(msgSpan);
  // li.id = id; 
  
  chatTextList.appendChild(li);
  
}


/**
 * 채팅 리스트 불러오기 
 */
function loadChatTextList(){
  
  //JSON 파일에서 데이터 로드 
  chats = JSON.parse(chatData);
  console.log(">>> chats : "+ JSON.stringify(chats ));
  
  chats.forEach(function(chat){
     addChatTextList(chat.profileId, chat.position, chat.type, chat.msg);
  });
}


/**
 * 대화명 리스트 추가 
 */
function addProfileList(profId, name, pos){
  
  const li        = document.createElement("li");
  const nameSpan  = document.createElement("span");
  const posSpan   = document.createElement("span");
  
  nameSpan.innderText = name;
  posSpan.innderText = pos;
  
  li.appendChild(nameSpan);
  li.appendChild(posSpan);
  li.id = profId; 
  
  profileList.appendChild(li);
  
}


/**
 * 대화명 리스트 불러오기 
 */
function loadProfile(){
  
  //JSON 파일에서 데이터 로드 
  profiles = JSON.parse(profileData);
  console.log(">>> profiles : "+ JSON.stringify(profiles ));
  
  profiles.forEach(function(prof){
     addProfileList(prof.profileId, prof.profileName, prof.position);
  });
}


function init(){
  // prjId = request.getParameter("prjId");
  // console.log(">>>>>>>>prjId : "+prjId);
  
  loadProfile();
}

init();
