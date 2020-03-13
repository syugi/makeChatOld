const chatInputForm = document.querySelector(".chatInputForm"),
chatInput = chatInputForm.querySelector("input"),
chatList   = document.querySelector(".chatList");

// const CHATS_LS = 'chats';

let chats = [];

let timeId = "";

// function saveChats(){
//   localStorage.setItem(CHATS_LS, JSON.stringfy(chats));
// }

function fn_sendMsg(msg,position,type,id){
  
  if(msg == "" || msg == null){
    return;
  }

  // const newId = chats.length + 1;
  const li = document.createElement("li");

  var elmt;

  //프로필
  if(type == "Profile"){
    setProfile(position,msg, id);
    return; 
  }
  
  //버튼
  if(type == "Btn"){
    elmt = document.createElement("button");
    elmt.addEventListener("click",handleContinue);

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
    
    fn_sendMsg("http://youtu.be/"+msg,position,"Msg");
    
    elmt = document.createElement("img");
    elmt.src = "https://img.youtube.com/vi/"+msg+"/0.jpg";
    elmt.onclick = () => { window.open("http://youtu.be/"+msg);};
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
      
    //일반 채팅 메세지 
    }else{
      elmt = document.createElement("span");
      elmt.innerText = msg;
    }
    
    elmt.classList.add(position+type);
    
  }
  
  elmt.classList.add("chatMsg"); //채팅 여백 
  
  li.id = chats.length + 1;
  li.appendChild(elmt);
    
  chatList.appendChild(li);
  
  //스크롤 맨 밑으로 
  chatList.scrollTop = chatList.scrollHeight;
  
  // const chatObj = {
  //     text :text,
  //     id: newId
  // }
  // chats.push(chatObj);
  
  // saveChats();
}

function handleSubmit(event){
  event.preventDefault();
  const msg = chatInput.value;
  fn_sendMsg(msg,"right","Msg","");
  chatInput.value = "";
}


// function loadChast(){
//   const loadChats = localStorage.getItem(CHATS_LS)
//   if(loadChats !== null){
//     const parsedChats = JSON.parse(loadChats);
//     parsedChats.forEash(function(chat){
//       fn_sendMsg(chat,"right");
//     });
//   }
// }


function sendNextChat(){

  const chatObj = chatObjArr.shift();
  
  if(chatObj != '' && chatObj != null){
    
    const msg  = chatObj.msg;
    
    if(msg != '' && msg != null){
        
        // var chatListAll   = chatList.querySelectorAll("li");
        // console.log(">>>"+chatListAll[0].id);
      
        fn_sendMsg(msg, chatObj.position, chatObj.type, chatObj.id); // 메세지, 위치, 타입(msg:메세지, img:이미지, btn:버튼), 이름
    }
    
  }
 
  // const msg = autoChatsA.shift(); 

  // if(msg == "stop"){
  //   fn_sendMsg("계속","continue");
  //   //clearInterval(timeId);
  //   return;
  // }

  // if(msg != "" && msg != null){   
  //   fn_sendMsg(msg,"left");
  // }else{
    
  //   const msgB = autoChatsB.shift(); 
  //   if(msgB != "" && msgB != null){   
  //     fn_sendMsg(msgB,"right");
  //   }
  //   //clearInterval(timeId);
  // }
  
}

function handleContinue(event){
  event.preventDefault();
 
  var el = document.getElementById(chats.length + 1);
  chatList.removeChild(el);
  //timeId = setInterval(sendNextChat, 1000);
  
}

function handleChatListClick(event){
  sendNextChat();
}

function setProfile(position,msg,id){
    
    const li = document.createElement("li");
    
    const img = document.createElement("img");
    img.src = msg;
    img.classList.add("profileImg");

    const span = document.createElement("span");
    span.innerText = id;
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
    
    //프로필 표시 후 다음메세지 바로 표시
    sendNextChat();
}

function init(){

  //loadChats();
  chatInputForm.addEventListener("submit",handleSubmit);

  //자동표시 
  //timeId = setInterval(sendNextChat, 1000);
   
  chatList.addEventListener("click",handleChatListClick);

}

init();
