const profileList   = document.querySelector(".profileList"),
chatTextList   = document.querySelector(".chatTextList"),
select_type = document.getElementById("select_type"),
projectName = document.querySelector(".projectName");

var autoChatYn = new Boolean(false);



function autoChatToggle(){
  
  const chatAutoRunBtn   = document.querySelector("#chatAutoRunBtn");
  
  //자동실행 중인 경우 
  if(autoChatYn == true){
    
    autoChatYn = false; 
    
    chatAutoRunBtn.style.background ="";
    chatAutoRunBtn.innerText = "채팅자동실행";
    stopAutoRunChat();
    
    
  //자동실행 중이 아닌 경우 
  }else{
    
    autoChatYn = true; 
    
    chatAutoRunBtn.style.background = "#e53e3e";
    chatAutoRunBtn.innerText = "채팅자동실행 ON";
    autoRunChat();
    
  }
}


/**
 * 채팅 추가 
 */
function addChatClick() {

  const chkPos = document.querySelector('input[name="chk_position"]:checked').value;	
  const chkProfId = document.querySelector('input[name="chk_position"]:checked').id;
  const selectType = select_type.options[select_type.selectedIndex].value
  const inputMsg = inputChat.value;
  console.log(">>>chkProfId : "+ chkProfId);
  
  if(inputMsg === null ||inputMsg === ''){
    return;
  }
 
  //채팅 저장 
  const chatObj = {
      prjId    : prjId
    , profId   : chkProfId
    , position : chkPos 
    , type     : selectType 
    , msg      : inputMsg
  }
  
  chats.push(chatObj);
  

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
     addChatTextList(chat.profId, chat.position, chat.type, chat.msg);
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
     addProfileList(prof.profId, prof.profName, prof.position);
  });
}




function init(){
  prjId = getParameterByName("prjId");
  console.log(">>>>>>>>prjId : "+getParameterByName("prjId"));
  
  //프로젝트 명 세팅 
  projectName.innerText = getCurrPrjName(prjId);

  //대화명 리스트 조회 
  loadProfile(prjId);

  //채팅 리스트 조회 
  loadChatTextList(prjId);
}

init();
