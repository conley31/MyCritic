var request = new XMLHttpRequest();
request.open('GET', '/searchResults');
request.responseType = 'json';
request.onload = function() {
    results = request.response;
    populateHtml();
};

request.send();

var populateHtml = function(){
    var games = JSON.parse(results["games"]);
    var songs = results["songs"];
    var books = JSON.parse(results["books"]);
    var movies = JSON.parse(results["movies"]);
    console.log(movies);
    console.log(songs);
    console.log(games);
    console.log(books);
    var html = '';
    var bodyDiv = document.getElementById("searchList");
   
    //list songs
    html += "<div style=\"margin-left: 5%\"><h1>Songs</h1></div>";
    for(i = 0; i < songs["tracks"]["items"].length && i < 5; i++){
        //html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/song/" + songs["tracks"]["items"][i]["id"] + "\'\"'><h1>" + songs["tracks"]["items"][i]["name"] + "</h1></div>";     
        html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/song/" 
        html += songs["tracks"]["items"][i]["id"] 
        html += "\'\"'> <img height=\"50px\" src=\"./staticImages/musicIcon.jpg\" align=\"right\"><h3 style=\"font-family: Arial\">" 
        html += songs["tracks"]["items"][i]["name"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+ songs["tracks"]["items"][i]["popularity"]+"</font> </div>";
    }

    //list games
    html += "<div style=\"margin-left: 5%; margin-top: 15px\"><h1>Games</h1></div>";
    for( i = 0; i < games.length && i < 5; i++){
        //html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/gameTitle/" + games[i]["id"] + "\'\"'><h1>" + games[i]["name"] + "</h1></div>";
        html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#29dd00\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/gameTitle/"
        html += games[i].id;
        html += "\'\"'> <img height=\"50px\" src=\"./staticImages/gameIcon.png\" align=\"right\"><h3 style=\"font-family: Arial\">"
        html += games[i].name;
         if(games[i].total_rating != null){
            html += "</h3> <font color=\"black\"> Average Score</font> : "+games[i].total_rating+"</font> </div>";
        }
        else {
            html += "</h3> <font color=\"black\"> Average Score</font> : No Rating</font> </div>";
        }
    }

    //list movies
    html += "<div style=\"margin-left: 5%; margin-top: 15px\"><h1>Movies</h1></div>";
    for (i = 0; i < movies["total_results"] && i < 5; i++){
	    //html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/movie/" + movies["results"][i]["id"] + "\'\"'><h1>" + movies["results"][i]["title"] + "</h1></div>";
        html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/movie/" 
        html += movies["results"][i]["id"] 
        html += "\'\"'> <img height=\"50px\" src=\"./staticImages/movieIcon.jpg\" align=\"right\"><h3 style=\"font-family: Arial\">" 
        html += movies["results"][i]["title"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+ movies["results"][i]["vote_average"] +"</font> </div>";
    }



    html += "<div style=\"margin-left: 5%; margin-top: 15px\"><h1>Books</h1></div>";
    if(books["GoodreadsResponse"]["search"]["results"]["work"] != null){
        for( i = 0; i < books["GoodreadsResponse"]["search"]["results"]["work"].length && i < 5; i++){
            if(books["GoodreadsResponse"]["search"]["results"]["work"][i]["best_book"]["title"]["_text"] == null){
                        html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/bookInfo/" 
                        html += books["GoodreadsResponse"]["search"]["results"]["work"][i]["best_book"]["id"]["_text"] 
                        html += "\'\"'> <img height=\"50px\" src=\"./staticImages/bookIcon.png\" align=\"right\"><h3 style=\"font-family: Arial\">" 
                        html += ["GoodreadsResponse"]["search"]["results"]["work"][i]["best_book"]["title"]["_cdata"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+ books["GoodreadsResponse"]["search"]["results"]["work"][i]["average_rating"]["_text"] +"</font> </div>";
                    }
                    else {
                        html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/bookInfo/" 
                        html += books["GoodreadsResponse"]["search"]["results"]["work"][i]["best_book"]["id"]["_text"] 
                        html += "\'\"'> <img height=\"50px\" src=\"./staticImages/bookIcon.png\" align=\"right\"><h3 style=\"font-family: Arial\">" 
                        html += books["GoodreadsResponse"]["search"]["results"]["work"][i]["best_book"]["title"]["_text"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+ books["GoodreadsResponse"]["search"]["results"]["work"][i]["average_rating"]["_text"] +"</font> </div>";
                    }
        }
    }
    bodyDiv.innerHTML = html;
}
