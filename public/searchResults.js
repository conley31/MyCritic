var request = new XMLHttpRequest();
request.open('GET', '/searchResults');
request.responseType = 'text';
request.onload = function() {
    results = request.response;
    populateHtml();
};

request.send();

var populateHtml = function(){
    //console.log(results);
    results = JSON.parse(results);

    //console.log(results);
    var games = results["games"];
    var songs = results["songs"];
    var movies = results["movies"];
    var books = results["books"];
    //console.log(movies);
    //console.log(songs);
    //console.log(games);
    console.log(books);
    var html = '';
    var bodyDiv = document.getElementById("searchList");
   
    //list songs
    html += "<div style=\"margin-left: 5%\"><h1>Songs</h1></div>";
    for(i = 0; i < songs["tracks"]["items"].length; i++){
        html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/song/" + songs["tracks"]["items"][i]["id"] + "\'\"'><h1>" + songs["tracks"]["items"][i]["name"] + "</h1></div>";     
    }

    //list games
    html += "<div style=\"margin-left: 5%; margin-top: 15px\"><h1>Games</h1></div>";
    for( i = 0; i < games.length; i++){
        html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/gameTitle/" + games[i]["id"] + "\'\"'><h1>" + games[i]["name"] + "</h1></div>";
    }

    //list movies
    html += "<div style=\"margin-left: 5%; margin-top: 15px\"><h1>Movies</h1></div>";
    for (i = 0; i < movies["total_results"] && i < 5; i++){
	html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/movie/" + movies["results"][i]["id"] + "\'\"'><h1>" + movies["results"][i]["title"] + "</h1></div>";
    }



    html += "<div style=\"margin-left: 5%; margin-top: 15px\"><h1>Books</h1></div>";
    for( i = 0; i < books["GoodreadsResponse"]["search"]["results"]["work"].length && i < 5; i++){
        html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/bookInfo/" + books["GoodreadsResponse"]["search"]["results"]["work"][i]["best_book"]["id"]["_text"] + "\'\"'><h1>" + books["GoodreadsResponse"]["search"]["results"]["work"][i]["best_book"]["title"]["_text"] + "</h1></div>";
    }
    bodyDiv.innerHTML = html;
}
