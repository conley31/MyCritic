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
	var html = "";
	var webReq = 'http://api.themoviedb.org/3/movie/';
	webReq += movieId;
	webReq += '?api_key=d26e26ba96250fb462f04e8c480e3351';
	console.log(webReq);
	$.getJSON(webReq, function(json){
		console.log(json);
		console.log(json["title"]);
		console.log(json["original_title"]);
		html += "<h1 style=\"margin-left: 10%\">" + json["title"] + "</h1>";
		html += "<h3 id=\"voteAverage\" style=\"margin-left: 10%\">Average Score: " + json["vote_average"] + "</h3>";
		html += "<h5 style=\"margin-left: 10%\">" + json["overview"] + "</h5>";
		bodyDiv.innerHTML = html;
	});
	console.log(html);
	bodyDiv.innerHTML = html;

}
