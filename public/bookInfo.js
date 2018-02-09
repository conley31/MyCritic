	
var request = new XMLHttpRequest();
request.open('GET', "/getBook/");
request.responseType = 'json';
var book = "";
request.onload = function() {
  	book = request.response;
  	console.log(book);
  	var bodyDiv = document.getElementById("bookInfo");
	var html = "<h1 style=\"margin-left: 10%; margin-right: 10%\">" + book["GoodreadsResponse"]["book"]["title"]["_cdata"] + "</h1>";
	html += "<h3 style=\"margin-left: 10%\">" + book["GoodreadsResponse"]["book"]["authors"]["author"]["name"]["_text"] + "</h3>";
	html += "<h5 style=\"margin-left: 10%\">Popularity " + book["GoodreadsResponse"]["book"]["average_rating"]["_text"] + "</h5>";
	html += "<p style=\"margin-left: 10%; margin-right: 10%\">Popularity " + book["GoodreadsResponse"]["book"]["description"]["_cdata"] + "</p>";
	bodyDiv.innerHTML = html;

};
request.send();

/*$.getJSON("https://www.goodreads.com/book/title.json?key=" + GRAPI + "&title=" + bookName, function(json){
	console.log(json);
});*/