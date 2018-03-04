var request = new XMLHttpRequest();
request.open('GET', "/getGame/");
request.responseType = 'json';
request.onload = function(){

    var bodyDiv = document.getElementById('gameInfo');

    gameObj = request.response;

    console.log(gameObj);

    var rating = gameObj[0].total_rating;

    if(rating == undefined){
        rating = "This game currently has no ratings!";
    }

    else rating += '%';
    var html = "<h1 style=\"font-size: 3.5em; text-align: center; margin-top: 3%\">" + gameObj[0].name + "</h1>";

    html += "<img style=\"margin-left: 47%; margin-top: 2%;\" src=\"" + gameObj[0]["cover"]["url"] + "\" />";

    html += "<h3 style=\"margin-left: 24%; font-size: 2em; margin-top: 2%; margin-bottom: 1%; font-family: Arial; width: 80%;\">Average Score: <font color=\"#78dc52\">" + parseInt(rating).toFixed(0) + "%</font></h3>";



    html += "<div width=\"60%\" style=\"margin-top: 1%; margin-left: 24%\">";

    html += "<h5 style=\"font-family: Arial; font-size: 1.2em; width: 70%; margin-bottom: 4%;\">" + gameObj[0].summary + "</h5>";

    html += "</div>";

    bodyDiv.innerHTML = html;
    //add hidden field to pass the title without having to make another api request
    var titleInput = document.createElement('input');
    titleInput.setAttribute('type','hidden');
    titleInput.setAttribute('name','title');
    titleInput.setAttribute('value',gameObj[0].name);
    if (document.getElementById('reviewForm') != null)
    document.getElementById('reviewForm').appendChild(titleInput);
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
        html += "<div id:\"" + i + "\" onclick=\"window.location=\'/user/"+reviews[i]["userId"] +"\'\" style=\"border-bottom: solid 1px; margin-left: 30%; padding-bottom: 1%; margin-right: 30%; margin-bottom: 2%; width: 40%; background-color: \'white\';\";>"

        //add back for the type src=\"./staticImages/movieIcon.jpg\"
        html += "<img height=\"50px\" align=\"right\"><h3 style=\"font-family: Arial\">"

        html += reviews[i]["reviewTxt"] + "</h3> <span><font color=\"#324fb6\"> Rating </font> : <font color=\"#c12020\">" + reviews[i]["rating"] + " / 5</font></span><br><span style=\"margin-top: 2 %\"><font color=\"#324fb6\">Review By</font>: "+reviews[i]["username"]+"</span></font> </div>";
    }

    bodyDiv.innerHTML = html;
}
