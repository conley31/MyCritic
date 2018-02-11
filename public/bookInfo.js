	
var request = new XMLHttpRequest();
request.open('GET', "/getBook/");
request.responseType = 'json';
var book = "";
request.onload = function() {
  	book = request.response;
  	var bodyDiv = document.getElementById("bookInfo");
  	console.log(book);
	var html = "";
	if(book["GoodreadsResponse"]["book"]["title"]["_cdata"] == null){
		html += "<h1 style=\"margin-left: 10%; margin-right: 10%\">" + book["GoodreadsResponse"]["book"]["title"]["_text"] + "</h1>";
	}
	else {
		html += "<h1 style=\"margin-left: 10%; margin-right: 10%\">" + book["GoodreadsResponse"]["book"]["title"]["_cdata"] + "</h1>";		
	}
	if(book["GoodreadsResponse"]["book"]["authors"]["author"].length > 1){
		html += "<h3 style=\"margin-left: 10%\">" + book["GoodreadsResponse"]["book"]["authors"]["author"][0]["name"]["_text"] + "</h3>";
	}
	else {
		html += "<h3 style=\"margin-left: 10%\">" + book["GoodreadsResponse"]["book"]["authors"]["author"]["name"]["_text"] + "</h3>";
	}
	html += "<h5 style=\"margin-left: 10%\">Popularity " + book["GoodreadsResponse"]["book"]["average_rating"]["_text"] + "</h5>";
	
	console.log(book["GoodreadsResponse"]["book"]["description"]);
	if(book["GoodreadsResponse"]["book"]["description"]["_cdata"] == null){
	html += "<p style=\"margin-left: 10%; margin-right: 10%\">" + "No Description For This Title" + "</p>";		
	}
	else{
		html += "<p style=\"margin-left: 10%; margin-right: 10%\">" + book["GoodreadsResponse"]["book"]["description"]["_cdata"] + "</p>";
	}
	bodyDiv.innerHTML = html;

};
request.send();

/*$.getJSON("https://www.goodreads.com/book/title.json?key=" + GRAPI + "&title=" + bookName, function(json){
	console.log(json);
});*/