var request = new XMLHttpRequest();
request.open('GET', "/getGame/");
request.responseType = 'json';
request.onload = function(){
    var bodyDiv = document.getElementById('gameInfo');
    gameObj = request.response;
    var html = "<h1 style=\"margin-left: 10%; margin-right: 10%\">" + gameObj[0].name + "</h1>"; 
    html += "<h3 style=\"margin-left: 10%\">" + gameObj[0].summary + "</h3>";
    html += "<h5 style=\"margin-left: 10%\">Total Rating: " + gameObj[0].total_rating + "%</h5>";
    bodyDiv.innerHTML = html;
};

request.send();

