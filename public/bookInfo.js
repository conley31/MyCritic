var request3 = new XMLHttpRequest();
request3.open('GET', "/averages");
request3.responseType = 'json';
var average = "";
request3.onload = function(){
	if(request3.response[0]["SUM(rating)"] == null){
		average = "No MyCritic Ratings";
	}
	else {
		average = request3.response[0]["SUM(rating)"];
	}
}

request3.send();

var request = new XMLHttpRequest();
request.open('GET', "/getBook/");
request.responseType = 'json';
var book = "";
request.onload = function() {
  	book = request.response;
  	var bodyDiv = document.getElementById("bookInfo");
	var html = "";
	 var titleInput = document.createElement('input');
	 titleInput.setAttribute('type','hidden');
	 titleInput.setAttribute('name','title');
	if(book["GoodreadsResponse"]["book"]["title"]["_cdata"] == null){
		html += "<h1 style=\"margin-left: 10%; margin-right: 10%\">" + book["GoodreadsResponse"]["book"]["title"]["_text"] + "</h1>";
		titleInput.setAttribute('value', book["GoodreadsResponse"]["book"]["title"]["_text"]);
	}
	else {
		html += "<h1 style=\"margin-left: 10%; margin-right: 10%\">" + book["GoodreadsResponse"]["book"]["title"]["_cdata"] + "</h1>";
		titleInput.setAttribute('value', book["GoodreadsResponse"]["book"]["title"]["_cdata"]);
	}
	if(book["GoodreadsResponse"]["book"]["authors"]["author"].length > 1){
		html += "<h3 style=\"margin-left: 10%\">" + book["GoodreadsResponse"]["book"]["authors"]["author"][0]["name"]["_text"] + "</h3>";
	}
	else {
		html += "<h3 style=\"margin-left: 10%\">" + book["GoodreadsResponse"]["book"]["authors"]["author"]["name"]["_text"] + "</h3>";
	}
	html += "<h5 style=\"margin-left: 10%\">Good Reads Popularity: " + book["GoodreadsResponse"]["book"]["average_rating"]["_text"] + "</h5>";
	html += "<h5 style=\"margin-left: 10%\">MyCritic Popularity: " + average + "</h5>";


	if(book["GoodreadsResponse"]["book"]["description"]["_cdata"] == null){
	html += "<p style=\"margin-left: 10%; margin-right: 10%\">" + "No Description For This Title" + "</p>";
	}
	else{
		html += "<p style=\"margin-left: 10%; margin-right: 10%\">" + book["GoodreadsResponse"]["book"]["description"]["_cdata"] + "</p>";
	}
	bodyDiv.innerHTML = html;
	//add hidden field to pass the title without having to make another api request
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
    var bodyDiv = document.getElementById("bookReviewsList");
    var html = "";
    var display = 0;
    if(reviews.length > 20){
        display = 20;
    }
    else {
        display = reviews.length;
    }

    for(i = 0; i < display; i++){
        html += "<div id=\"" + i + "\" onclick=\"window.location=\'/user/"+reviews[i]["userId"] +"\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\";>"

        //add back for the type src=\"./staticImages/movieIcon.jpg\"
        html += "<img height=\"50px\" align=\"right\"><h3 style=\"font-family: Arial\">"

        html += reviews[i]["reviewTxt"] + "</h3> <span><font color=\"#dd4300\"> rating </font> : " + reviews[i]["rating"] + "</span><span style=\"margin-left:75%\"><font color=\"#dd4300\">user</font>: <u onmouseover=\"this.style.cursor='pointer'\">"+reviews[i]["username"]+"</u></span></font> </div>";
    }

    bodyDiv.innerHTML = html;
}
