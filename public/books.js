var API = "2e30dfd30ca7408a957ee54dc4aa2bc3";
var url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json";
url += '?' + $.param({
  'api-key': API
});

$.getJSON(url, function(json){
	var bodyDiv = document.getElementById("bookList");
	var html = "";
	for( i = 0; i < 20; i++){
		console.log(json["results"][i]["title"]);
		html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/bookInfo/" + json["results"][i]["title"] + "\'\"'><h1>" + json["results"][i]["title"] + "</h1></div>";
	}
	bodyDiv.innerHTML = html;
});