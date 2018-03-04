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
					if(bookID[i].response["GoodreadsResponse"]["book"]["title"]["_text"] == null){
						//html += "<div id=\"" + i + "\" style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/bookInfo/" + bookID[i].response["GoodreadsResponse"]["book"]["id"]["_text"] + "\'\"'><h1>" + bookID[i].response["GoodreadsResponse"]["book"]["title"]["_cdata"] + "</h1></div>";
			  			html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/bookInfo/" 
       					html += bookID[i].response["GoodreadsResponse"]["book"]["id"]["_text"] 
        				html += "\'\"'> <img height=\"50px\" src=\"./staticImages/bookIcon.png\" align=\"right\"><h3 style=\"font-family: Arial\">" 
        				html += bookID[i].response["GoodreadsResponse"]["book"]["title"]["_cdata"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+bookID[i].response["GoodreadsResponse"]["book"]["average_rating"]["_text"]+"</font> </div>";
			  		}
			  		else {
						//html += "<div id=\"" + i + "\" style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/bookInfo/" + bookID[i].response["GoodreadsResponse"]["book"]["id"]["_text"] + "\'\"'><h1>" + bookID[i].response["GoodreadsResponse"]["book"]["title"]["_text"] + "</h1></div>";			  			
			  			html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/bookInfo/" 
       					html += bookID[i].response["GoodreadsResponse"]["book"]["id"]["_text"] 
        				html += "\'\"'> <img height=\"50px\" src=\"./staticImages/bookIcon.png\" align=\"right\"><h3 style=\"font-family: Arial\">" 
        				html += bookID[i].response["GoodreadsResponse"]["book"]["title"]["_text"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+bookID[i].response["GoodreadsResponse"]["book"]["average_rating"]["_text"]+"</font> </div>";
			  		}	
			  		bodyDiv.innerHTML = html;
			  	}
			};
			//html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/bookInfo/" + json["results"][i]["title"] + "\'\"'><h1>" + json["results"][i]["title"] + "</h1></div>";
			bookID[i].send();
		})(i);
	}
});
