var request = new XMLHttpRequest();
request.open('GET', "/access");
request.responseType = 'text';
request.onload = function() {
	movieInfo();
}
request.send();
var movieInfo = function() {
	var movieId = window.location.pathname;
//	console.log(request.reponse);
	var movieId = movieId.slice(7, movieId.length);

	console.log(movieId);
	var bodyDiv = document.getElementById("movInfo");
	var html = "<h1 style=\"margin-left: 10%\">" + movieId + "</h1>";
	var request = 'http://api.themoviedb.org/3/movie/';
	request += movieId;
	request += '?api_key=d26e26ba96250fb462f04e8c480e3351';
	$.getJSON(request, function(json){
		html += "<h3 style=\"margin-left: 10%\">" + json["title"] + "</h3>";
		html += "<h5 style=\"margin-left: 10%\">Average Score " + json["vote_average"]
	});
	console.log(html);
	bodyDiv.innerHTML = html;

}
