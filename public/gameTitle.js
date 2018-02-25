var request = new XMLHttpRequest();
request.open('GET', "/getGame/");
request.responseType = 'json';
request.onload = function(){

    var bodyDiv = document.getElementById('gameInfo');

    gameObj = request.response;
    var rating = gameObj[0].total_rating;
    if(rating == undefined){
        rating = "This game currently has no ratings!"
    }
    else rating += '%';
    var html = "<h1 style=\"font-size: 3.5em; text-align: center; margin-top: 3%\">" + gameObj[0].name + "</h1>";

    html += "<div width=\"60%\" style=\"margin-top: 5%; margin-left: 24%\">";

    html += "<h5 style=\"font-family: Arial; font-size: 1.2em; width: 70%; margin-bottom: 4%;\">" + gameObj[0].summary + "</h5>";

    html += "<h5 style=\"margin-left: 10%\">Total Rating: " + gameObj[0].total_rating + "%</h5>";

    html += "</div>";
    bodyDiv.innerHTML = html;
};

request.send();
