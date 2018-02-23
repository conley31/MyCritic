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


		html += "<h1 style=\"font-size: 3.5em; text-align: center; margin-top: 3%\">" + json["title"] + "</h1>";

        html += "<div width=\"60%\" style=\"margin-top: 5%; margin-left: 24%\">";
        
        html += "<img style=\"height: 500px; float: left; margin-right: 8%;\" src=\"https://image.tmdb.org/t/p/w500/" + json["poster_path"] + "\" />";


		html += "<h3 style=\"font-size: 2em; margin-bottom: 3%; font-family: Arial; width: 80%;\">Average Score: <font color=\"#78dc52\">" + json["vote_average"] + "</font></h3>";

		html += "<h5 style=\"font-family: Arial; font-size: 1.4em; width: 70%; margin-bottom: 4%;\">" + json["overview"] + "</h5>";

		html += "<h5 style=\"font-family: Arial; color: #6297bc; font-size: 1.4em; width: 70%;\">Release Date - " + json["release_date"] + "</h5>";

		html += "<h5 style=\"font-family: Arial; color: #ee5622; font-size: 1.4em; width: 70%;\">Runtime - " + json["runtime"] + " minutes</h5>";
        //html += "</p>";


        html += "</div>";

		bodyDiv.innerHTML = html;

	});
	console.log(html);
	bodyDiv.innerHTML = html;

}
