const projectList   = document.querySelector(".projectList");

const userId = "arim"; //일단 하드코딩 


/**
 * 채팅관리 화면으로 이동 
 */
function moveChatSetting(prjId){
  location.href = "chatSetting.html?prjId="+prjId;
}

/**
 * 프로젝트 ID 생성
 */
function getPrjId(){

  return parseInt(projects[projects.length-1].prjId) + 1;
}

/**
 * 프로젝트 생성
 */
function createProject(){
  
  const newPrjId   = getPrjId();
  const newPrjName = "NEW PROJECT - "+newPrjId;
  
  const prjObj = {
    id: userId,
    prjId : newPrjId,
    prjName : newPrjName
  };
  
  projects.push(prjObj);
  
  addProjectList(newPrjId,newPrjName);
}

/**
 * 프로젝트 삭제 버튼 이벤트  
 */
function handleDeleteClick(event){
  const btn = event.target;
  const li  = btn.parentNode;
  
  projectList.removeChild(li);
  
  const removePrj = projects.filter(function(prj){
    return prj.prjId !== parseInt(li.id);
  });
  
  projects = removePrj;
  
  //console.log(">>> 삭제 후 projects : "+ JSON.stringify(projects ));
}


/**
 * 프로젝트 수정 버튼 이벤트  
 */
function handleModifyClick(event){
  
  const btn = event.target;
  const li  = btn.parentNode;
  
  //채팅설정 화면으로 이동
  moveChatSetting(li.id);
  
}

/**
 * 프로젝트 리스트 세팅 
 * 
 * @param prjId   : 프로젝트 ID
 * @param prjName : 프로젝트 명
 */
function addProjectList(prjId,prjName){
  
  const li       = document.createElement("li");
  const modBtn   = document.createElement("Button");
  const delBtn   = document.createElement("Button");
  const idSpan   = document.createElement("span");
  const nameSpan = document.createElement("span");
  
  modBtn.innerText = "수정";
  modBtn.addEventListener("click", handleModifyClick);
  
  delBtn.innerText = "삭제";
  delBtn.addEventListener("click", handleDeleteClick);
  
  idSpan.innerText = prjId;
  nameSpan.innerText = prjName;
  
  li.appendChild(idSpan);
  li.appendChild(nameSpan);
  li.appendChild(modBtn);
  li.appendChild(delBtn);
  
  li.id = prjId;
  
  projectList.appendChild(li);
  
  //console.log(">>> 추가 후 projects : "+ JSON.stringify(projects ));
}


/**
 * 프로젝트 리스트 불러오기 
 */
function loadProjects(){
  
  //JSON 파일에서 데이터 로드 
  projects = JSON.parse(projectsData);
  console.log(">>> projects : "+ JSON.stringify(projects ));
  
  projects.forEach(function(project){
     addProjectList(project.prjId, project.prjName);
  });
}


function init(){

  //프로젝트 데이타 불러오기 
  loadProjects();
  
}

init();
