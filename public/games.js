var request = new XMLHttpRequest();
request.open('GET', "/accessNewGames");
request.responseType = 'text';
var newGamesList;
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

        html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#29dd00\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/gameTitle/"

        html += json[i].id;

        html += "\'\"'> <img height=\"50px\" src=\"./staticImages/gameIcon.png\" align=\"right\"><h3 style=\"font-family: Arial\">"

        html += json[i].name;

        html += "</h3> <font color=\"black\"> Average Score</font> : 6.2</font> </div>";

    }
    bodyDiv.innerHTML = html;
}
