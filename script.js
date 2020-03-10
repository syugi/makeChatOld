const chatInputForm = document.querySelector(".chatInputForm"),
chatInput = chatInputForm.querySelector("input"),
chatList   = document.querySelector(".chatList");

// const CHATS_LS = 'chats';

let chats = [];

// position : 위치(left,right,center) , 위치, 타입(msg:메세지, img:이미지, btn:버튼)

let autoChats = [
    { position:"left",type:"Youtu" , name:  "선생님", msg: "WGSwKW3dPdA", sendYn: false },
    { position:"left",type:"Img" , name:  "선생님", msg: "temp_img1.jpeg", sendYn: false },
    { position:"left", type:"Msg" ,name:  "선생님", msg: "인공지능의 겨울은 ...", sendYn: false },
    { position:"left", type:"Msg" ,name:  "선생님", msg: "맞아요! 센스가 좀 있군요!", sendYn: false },
     { position:"left", type:"Profile" ,name:  "선생님", msg:"profile_1.jpeg", sendYn: false },
    { position:"right", type:"Msg" ,name: "학생", msg: "인공지능의 발전이 멈춰있던 시기인가....?", sendYn: false },
    { position:"right", type:"Msg" ,name: "학생", msg: "인공지능의겨울?", sendYn: false },
    { position:"right", type:"Msg" ,name: "학생", msg: "이번 주제는 꽤나 재밌어 보이는데?", sendYn: false },
    { position:"right", type:"Msg" ,name: "학생", msg: "반가워요!!:)", sendYn: false },
    { position:"right", type:"Profile" ,name: "학생", msg:"profile_2.jpg", sendYn: false },
    { position:"left", type:"Msg" ,name:  "선생님", msg: "오늘 이야기의 주제는 '인공지능의 겨울'이에요.", sendYn: false },
    { position:"left", type:"Msg" ,name:  "선생님", msg: "안녕하세요:) 저는 에이림입니다.", sendYn: false },
    { position:"left", type:"Msg" ,name:  "선생님", msg: "지금 바로 시작합니다.", sendYn: false },
    { position:"left", type:"Msg" ,name: "학생", msg: "인공지능, 텐서플로우 2.0으로 읽다.", sendYn: false },
    { position:"left", type:"Profile" ,name: "선생님", msg:"profile_1.jpeg", sendYn: false }
];


let timeId = "";

// function saveChats(){
//   localStorage.setItem(CHATS_LS, JSON.stringfy(chats));
// }

function fn_sendMsg(msg,position,type,name){
  
  if(msg == "" || msg == null){
    return;
  }

  // const newId = chats.length + 1;
  const li = document.createElement("li");

  var elmt;

  //프로필
  if(type == "Profile"){
    setProfile(position,msg, name);
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
    
    fn_sendMsg("http://youtu.be/"+msg,position,"Msg")
    
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


function autoChat(){

  const chatObj = autoChats.pop();
  
  if(chatObj != '' && chatObj != null){
    
    const msg  = chatObj.msg;
    
    if(msg != '' && msg != null){
        fn_sendMsg(msg, chatObj.position, chatObj.type, chatObj.name); // 메세지, 위치, 타입(msg:메세지, img:이미지, btn:버튼), 이름
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
  //timeId = setInterval(autoChat, 1000);
  
}

function handleChatListClick(event){
  autoChat();
}

function setProfile(position,msg,name){
    
    const li = document.createElement("li");
    
    const img = document.createElement("img");
    img.src = msg;
    img.classList.add("profileImg");

    const span = document.createElement("span");
    span.innerText = name;
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
    autoChat();
}

function init(){

  //loadChats();
  chatInputForm.addEventListener("submit",handleSubmit);

  //자동표시 
  //timeId = setInterval(autoChat, 1000);
   
  chatList.addEventListener("click",handleChatListClick);

}

init();
