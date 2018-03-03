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

    html += "<h5 style=\"margin-left: 10%\">Total Rating: " + rating + "</h5>";

    html += "</div>";
    bodyDiv.innerHTML = html;
};
request.send();


var request2 = new XMLHttpRequest();
request2.open('GET', "/mediaReviews");
request2.responseType = 'json';
var reviews = "";
request2.onload = function() {
  reviews = request2.response;
  reviewsfunc();
};

request2.send();

var reviewsfunc = function(){
    var bodyDiv = document.getElementById("gameReviewsList");
    var html = "";
    var display = 0;
    if(reviews.length > 20){
        display = 20;
    }
    else {
        display = reviews.length;
    }
    console.log(reviews);

    for(i = 0; i < display; i++){
        html += "<div id:\"" + i + "\" onclick=\"window.location=\'/user/"+reviews[i]["userId"] +"\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\";>" 

        //add back for the type src=\"./staticImages/movieIcon.jpg\"
        html += "<img height=\"50px\" align=\"right\"><h3 style=\"font-family: Arial\">" 

        html += reviews[i]["reviewTxt"] + "</h3> <font color=\"#dd4300\"> rating </font> : " + reviews[i]["rating"] + "</font> </div>";
    }

    bodyDiv.innerHTML = html;
}
