const profileList   = document.querySelector(".profileList"),
chatTextList   = document.querySelector(".chatTextList"),
select_type = document.getElementById("select_type");

/**
 * 채팅 리스트 실행 초기화 
 */
function chatRunClr(){
  clearChat();
}

/**
 * 채팅 리스트 실행 테스트  
 */
function chatRunTest(){
  startChat();
}

/**
 * 채팅 추가 
 */
function addChat_click() {

  const chkPos = document.querySelector('input[name="chk_position"]:checked').value;	
  const chkProfId = document.querySelector('input[name="chk_position"]:checked').id;
  const selectType = select_type.options[select_type.selectedIndex].value
  const inputMsg = inputChat.value;
  console.log(">>>chkProfId : "+ chkProfId);
  
  //채팅 저장 
  const chatObj = {
      position : chkPos 
    , type     : selectType 
    , profileId   : chkProfId
    , msg      : inputMsg
  }
  
  chats.push({ position:chkPos ,type:selectType , userId: chkProfId, msg: inputMsg, sendYn: false});
  

  //채팅 리스트에 추가 
  addChatTextList(chkProfId, chkPos, selectType, inputMsg);
  
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
  posSpan.innerText = pos;
  typeSpan.innerText = type;
  msgSpan.innerText = msg;
  
  // li.appendChild(nameSpan);
  li.appendChild(posSpan);
  li.appendChild(typeSpan);
  li.appendChild(msgSpan);
  // li.id = id; 
  
  chatTextList.appendChild(li);
  
}


/**
 * 채팅 리스트 불러오기 
 * @param prjId : 프로젝트 ID
 */
function loadChatTextList(prjId){
  
  //JSON 파일에서 데이터 로드 
  chats = JSON.parse(chatData);
  console.log(">>> chats : "+ JSON.stringify(chats));
  
  //프로젝트 ID로 필터링 
  chats = filterByPrjId(chats,prjId);

  chats.forEach(function(chat){
     addChatTextList(chat.profileId, chat.position, chat.type, chat.msg);
  });
}


/**
 * 대화명 리스트 추가 
 */
function addProfileList(profId, name, pos){
  console.log("profId : "+profId+" name : "+name+" pos : "+pos);
  const li        = document.createElement("li");
  const nameSpan  = document.createElement("span");
  const posSpan   = document.createElement("span");
  
  nameSpan.innerText = name;
  posSpan.innerText = pos;
  
  li.appendChild(nameSpan);
  li.appendChild(posSpan);
  li.id = profId; 
  
  profileList.appendChild(li);
  
}


/**
 * 대화명 리스트 불러오기 
 * @param prjId : 프로젝트 ID
 */
function loadProfile(prjId){
  
  //JSON 파일에서 데이터 로드 
  profiles = JSON.parse(profileData);
  console.log(">>> profiles : "+ JSON.stringify(profiles ));
  
  //프로젝트 ID로 필터링 
  profiles = filterByPrjId(profiles,prjId);
  profiles.forEach(function(prof){
     addProfileList(prof.profileId, prof.profileName, prof.position);
  });
}


function init(){
  prjId = getParameterByName("prjId");
  console.log(">>>>>>>>prjId : "+getParameterByName("prjId"));

  //대화명 리스트 조회 
  loadProfile(prjId);

  //채팅 리스트 조회 
  loadChatTextList(prjId);
}

init();
