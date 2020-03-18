
let projects = [];
let chats = [];
let profiles  = []; 

let prjId  = "";

/**
 * 전달 파라미터  
 * @param name : 파라미터 변수명 
 */
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

/**
 * 프로젝트 ID로 필터링 
 * @param arrList : 필터링 대상 배열  
 * @param prjId   : 프로젝트 ID 
 */
function filterByPrjId(arrList, prjId){
  let resultList = arrList.filter(function(arr){
    return arr.prjId === parseInt(prjId);
  });
  return resultList;
}

/**
 * 현재 프로젝트 이름  
 * @param prjId : 프로젝트 ID
 * @return 
 */
function getCurrPrjName(prjId){
  
  let currPrjName = "";
  
  projects = JSON.parse(projectsData);
  const currProject = filterByPrjId(projects,prjId);
  if(currProject.length > 0 ){
    currPrjName = currProject[0].prjName;
  }
  
  return currPrjName; 
}
