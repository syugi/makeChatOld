
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