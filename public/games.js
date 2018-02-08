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
    for( i = 0; i < 5; i++){
        html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/game/" + json[i].game.name + "\'\"'><h1>" + json[i].game.name + "</h1></div>";
    }
    bodyDiv.innerHTML = html;
}
