var API = "2e30dfd30ca7408a957ee54dc4aa2bc3";
var url = "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json";
url += '?' + $.param({
  'api-key': API
});

var bookID = [];

var bodyDiv = document.getElementById("bookList");
var html = "";

$.getJSON(url, function(json){
	for( i = 0; i < 20; i++){
		(async function (i) {
			bookID[i] = new XMLHttpRequest();
			bookID[i].responseType = 'json';
			console.log("/getBookID?author="+json["results"][i]["author"]+"&title="+json["results"][i]["title"]);
			/*var title = "";
			if(json["results"][i]["title"].indexOf("#") != -1){
				title = "\\"+json["results"][i]["title"];
			}
			else{
				title = json["results"][i]["title"];
			}*/
			bookID[i].open('GET', "/getBookID?author="+json["results"][i]["author"]+"&title="+json["results"][i]["title"], true);
			bookID[i].onreadystatechange = await function() {
				if(bookID[i].response != null){
					console.log(bookID[i].response["GoodreadsResponse"]["book"]["id"]);
					if(bookID[i].response["GoodreadsResponse"]["book"]["title"]["_text"] == null){
						html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/bookInfo/" + bookID[i].response["GoodreadsResponse"]["book"]["id"]["_text"] + "\'\"'><h1>" + bookID[i].response["GoodreadsResponse"]["book"]["title"]["_cdata"] + "</h1></div>";
			  		}
			  		else {
						html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/bookInfo/" + bookID[i].response["GoodreadsResponse"]["book"]["id"]["_text"] + "\'\"'><h1>" + bookID[i].response["GoodreadsResponse"]["book"]["title"]["_text"] + "</h1></div>";			  			
			  		}	
			  		bodyDiv.innerHTML = html;
			  	}
			};
			//html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/bookInfo/" + json["results"][i]["title"] + "\'\"'><h1>" + json["results"][i]["title"] + "</h1></div>";
			bookID[i].send();
		})(i);
	}
	console.log("SHOULD BE HERE")
});