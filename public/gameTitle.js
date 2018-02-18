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
    var html = "<h1 style=\"margin-left: 10%; margin-right: 10%\">" + gameObj[0].name + "</h1>"; 
    html += "<h3 style=\"margin-left: 10%\">" + gameObj[0].summary + "</h3>";
    html += "<h5 id=\"ratingNumber\" style=\"margin-left: 10%\">Total Rating: " + rating + "</h5>";
    bodyDiv.innerHTML = html;
};

request.send();

