const chatInputForm = document.querySelector(".chatInputForm"),
chatInput = chatInputForm.querySelector("input"),
chatList   = document.querySelector(".chatList");

let timeId = "";

/**
 * 채팅 초기화
 */
function clearChat(){
  
  while (chatList.hasChildNodes()) {
    chatList.removeChild(chatList.firstChild);
 }

 loadChats();
 
}

/**
 * 채팅 자동 실행 멈춤
 */
function stopAutoRunChat(){
    if(timeId != null) {
        clearInterval(timeId);
    }
}

/**
 * 채팅 자동 실행 
 */
function autoRunChat(){
  timeId = setInterval(sendNextChat, 1000);
}

/**
 * 메세지 표시 
 *
 * @param msg        : 메세지 내용
 * @param position   : 위치(left,right)
 * @param type       : 타입(버튼-Btn, 이미지-Img, 유튜브-Youtu, 메세지-Msg)
 * @param profId     : 프로필 ID
 */
function sendMsg(msg,position,type,profId){
  
  if(msg == "" || msg == null){
    return;
  }

  const li = document.createElement("li");

  var elmt;
  
  //버튼
  if(type == "Btn"){
    elmt = document.createElement("button");
    elmt.addEventListener("click",handleChatButtonClick);

    elmt.classList.add(type);
    elmt.classList.add(position);
    
  //이미지
  }else if(type == "Img"){
    
    elmt = document.createElement("img");
    elmt.src = msg;
    // elmt.width = "300";
    // elmt.height = "200";

    elmt.classList.add(type);
    elmt.classList.add(position);
    
  //유튜브 링크 
  }else if(type == "Youtu"){


    //유튜브 형식이 아닌경우 메세지로 처리 
    if(msg.indexOf("youtu.be") < 0){
      sendMsg(msg,position,"Msg",profId)
      return;
    }
  
    sendMsg(msg,position,"Msg",profId);
    
    //유튜브 ID 분리 
    const msgSplit = msg.split("/");
    const youtuId  = msgSplit[3];  //유튜브 링크 예시) https://youtu.be/CI0oF5RovCs 
    console.log("유튜브 ID:"+youtuId);
    
    elmt = document.createElement("img");
    elmt.src = "https://img.youtube.com/vi/"+youtuId+"/0.jpg";
    elmt.onclick = () => { window.open(msg);};
    elmt.style.cursor = "pointer";
    // elmt.width = "300";
    // elmt.height = "200";
    
    elmt.classList.add(type);
    elmt.classList.add(position);
   
  //메세지 
  }else{
    
    //링크가 있는경우 하이퍼링크
    if(msg.indexOf("http")>-1){
      
      elmt = document.createElement("a");
      elmt.textContent = msg;
      elmt.href = msg;
      elmt.style.color = "blue";
      elmt.style.textDecoration='underline';
      
    //일반 채팅 메세지 
    }else{
      elmt = document.createElement("span");
      elmt.innerText = msg;
    }
    
    elmt.classList.add(position+type);
    
  }
  
  elmt.classList.add("chatMsg"); //채팅 여백 
  
  li.id    = chats.length + 1;  //리스트 ID
  li.value = profId;            //프로필 ID
  li.appendChild(elmt);
    
  chatList.appendChild(li);
  
  //스크롤 맨 밑으로 
  chatList.scrollTop = chatList.scrollHeight;

}


/**
 * 프로필 표시 
 *
 * @param profId   : 프로필 ID 
 * 
 */
function setProfile(profId){
    
    let imgPath     = ""; //프로필 이미지 경로
    let profName    = ""; //프로필 이름 
    let position    = ""; //위치(left,right)
    
    /* To-do
    *  profId로 프로필 사진 및 이름 불러오기 
    *
    */
    
    const li = document.createElement("li");
    
    const img = document.createElement("img");
    img.src = imgPath;
    img.classList.add("profileImg");

    const span = document.createElement("span");
    span.innerText = profId;
    span.classList.add("profileName");
    
   
    if(position == "right"){
      li.appendChild(span);
      li.appendChild(img);
      
    }else{
      li.appendChild(img);
      li.appendChild(span);
    }  
    
    li.classList.add("profile");
    li.classList.add(position);
    
    chatList.appendChild(li);
    
}

/**
 * 다음 채팅 표시 
 */
function sendNextChat(){

  const chatObj = chats.shift();
  
  if(chatObj != '' && chatObj != null){
    
    const msg  = chatObj.msg;
    
    if(msg != '' && msg != null){
        
        /* To-do
        *  profId가 전에 보낸 채팅 id랑 같지 않으면 프로필 전송하기 
        */ 
        const liList = document.querySelectorAll(".chatList li");
        const prevProfId = liList[liList.length-1].value;
       // if(chatObj.profId);
       
      // let tempMsg = liList.length;
       
       // sendMsg(tempMsg, chatObj.position, chatObj.type, chatObj.profId); 
        
        sendMsg(msg, chatObj.position, chatObj.type , chatObj.profId);   // 메세지, 위치, 타입(msg:메세지, img:이미지, btn:버튼), 프로필 ID
    }
    
  }
}

/**
 * 채팅 시작 
 */
function startChat(){
  // const li = document.createElement("li");
  // const span = document.createElement("span");

  // span.innerText = "대화가 시작되었습니다.";
  // span.style.marginLeft = "10rem";

  // li.appendChild(span);
  // chatList.appendChild(li);

  sendNextChat();
}


/**
 * 채팅 불러오기 
 */
function loadChats(){

  //JSON 파일에서 데이터 로드 
  chats = JSON.parse(chatData);
  console.log(">>> chats : "+ JSON.stringify(chats));
  
  //프로젝트 ID로 필터링 
  chats = filterByPrjId(chats,prjId);

}



/**
 * 채팅 안에 버튼 - 클릭 이벤트
 */
function handleChatButtonClick(event){
  event.preventDefault();
 
  var el = document.getElementById(chats.length + 1);
  chatList.removeChild(el);
  
}

/**
 * 채팅 표시 - 클릭 이벤트
 */
function handleChatListClick(event){
  sendNextChat();
}


/**
/* 채팅 수동 보내기 
*/
function handleSubmit(event){
  event.preventDefault();
  const msg = chatInput.value;
  sendMsg(msg,"right","Msg","userId");
  chatInput.value = "";
}


function init(){

  //채팅 불러오기  
  loadChats();
  
  //채팅 수동 보내기 
  chatInputForm.addEventListener("submit",handleSubmit);

  //채팅 표시 - 클릭 이벤트 
  chatList.addEventListener("click",handleChatListClick);

}


init();
