const chatInputForm = document.querySelector(".chatInputForm"),
chatInput = chatInputForm.querySelector("input"),
chatList   = document.querySelector(".chatList");

// const CHATS_LS = 'chats';

let chats = [];

let autoChats = ["안녕하세요","저는","자동 챗봇입니다","이해가 가시나요?","stop","그럼","이제 시작하도록","하겠습니다"];

let timeId = "";

// function saveChats(){
//   localStorage.setItem(CHATS_LS, JSON.stringfy(chats));
// }

function fn_sendMsg(msg,position){
  
  // const newId = chats.length + 1;
  const li = document.createElement("li");

  if(position == "continue"){

    const btn = document.createElement("button");
    btn.innerText = msg;
    btn.classList.add(position+"Msg");
    btn.addEventListener("click",handleContinue);
    li.id = chats.length + 1;
    li.appendChild(btn);

  }else{
    const span = document.createElement("span");
    span.innerText = msg;
    span.classList.add(position+"Msg");
    li.appendChild(span);
  }
  // li.id = newId;
  chatList.appendChild(li);
  
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
  fn_sendMsg(msg,"right");
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

  const msg = autoChats.shift(); 

  if(msg == "stop"){
    fn_sendMsg("계속","continue");
    clearInterval(timeId);
    return;
  }

  if(msg != "" && msg != null){   
    fn_sendMsg(msg,"left");
  }else{
    clearInterval(timeId);
  }
  
}

function handleContinue(event){
  event.preventDefault();
 
  var el = document.getElementById(chats.length + 1);
  chatList.removeChild(el);
  timeId = setInterval(autoChat, 1000);
  
}

function init(){

  //loadChats();
  chatInputForm.addEventListener("submit",handleSubmit);

  timeId = setInterval(autoChat, 1000);
   
}

init();
