var request = new XMLHttpRequest();
request.open('GET', "/accessNewGames");
request.responseType = 'text';
var newGamesList;
var loadingDiv = document.getElementById("loadingDiv");
loadingDiv.innerHTML = "<center>Loading...</center>";
request.onload = function(){
    newGamesList = request.response;
    populateHtml();
};
request.send();

var populateHtml = function(){
    var json = JSON.parse(newGamesList);
    var bodyDiv = document.getElementById("newGameList");
    var html = "";
    for( i = 0; i < 50; i++){
        html += "<div id=\""+i+"\"onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#29dd00\'; this.style.cursor=\'pointer\' \" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/gameTitle/"
        html += json[i].id;
        html += "\'\"'> <img height=\"50px\" src=\"./staticImages/gameIcon.png\" align=\"right\"><h3 style=\"font-family: Arial\">"
        html += json[i].name;
        if(json[i].total_rating != null){
            html += "</h3> <font color=\"black\"> Average Score</font> : "+ parseInt(json[i].total_rating).toFixed(0) +"</font> </div>";
        }
        else {
            html += "</h3> <font color=\"black\"> Average Score</font> : No Rating</font> </div>";
        }
    }
    bodyDiv.innerHTML = html;
    loadingDiv.style.visibility = "hidden";
}
