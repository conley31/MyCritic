var filt = 0
var request = new XMLHttpRequest();
request.open('GET', '/searchResults');
request.responseType = 'text';
request.onload = function() {
    results = request.response;
    populateHtml();
};

request.send();

var change = function(opt){
    filt = opt;

    console.log(filt);
    request = new XMLHttpRequest();
    request.open('GET', '/searchResults');
    request.responseType = 'json';
    request.onload = function() {
        results = request.response;
        if(filt == 0 ){
            populateHtml();
        }
        else {
            console.log("here");
            filterSearch();
        }
    };

    request.send();
};

var populateHtml = function(){
    results = JSON.parse(results);

    var games = results["games"];
    var songs = results["songs"];
    var movies = results["movies"];
    var books = results["books"];
    var html = '';
    var bodyDiv = document.getElementById("searchList");
   
    //list songs
	//
    console.log(movies);
    html += "<div style=\"margin-left: 5%\"><h1>Songs</h1></div>";
	if (songs["tracks"] != null && songs["tracks"]["items"].length != 0) {
        for(i = 0; i < songs["tracks"]["items"].length && i < 5; i++){
            //html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/song/" + songs["tracks"]["items"][i]["id"] + "\'\"'><h1>" + songs["tracks"]["items"][i]["name"] + "</h1></div>";     
            html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/song/" 
            html += songs["tracks"]["items"][i]["id"] 
            html += "\'\"'> <img height=\"50px\" src=\"./staticImages/musicIcon.jpg\" align=\"right\"><h3 style=\"font-family: Arial\">" 
            html += songs["tracks"]["items"][i]["name"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+ songs["tracks"]["items"][i]["popularity"]+"</font> </div>";
        }
	}
    else {
        html += "<div style=\"margin-left: 25%; margin-top: 2%\"><h2>No Results</h2></div>";
    }

    //list games
    html += "<div style=\"margin-left: 5%; margin-top: 15px\"><h1>Games</h1></div>";
    if(games != null && games.length != 0){
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
    }
    else {
        html += "<div style=\"margin-left: 25%; margin-top: 2%\"><h2>No Results</h2></div>";
    }

    //list movies
    html += "<div style=\"margin-left: 5%; margin-top: 15px\"><h1>Movies</h1></div>";
    if(movies["results"] != null && movies["results"].length != 0){
        for (i = 0; i < movies["total_results"] && i < 5; i++){
    	    //html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/movie/" + movies["results"][i]["id"] + "\'\"'><h1>" + movies["results"][i]["title"] + "</h1></div>";
            html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/movie/" 
            html += movies["results"][i]["id"] 
            html += "\'\"'> <img height=\"50px\" src=\"./staticImages/movieIcon.jpg\" align=\"right\"><h3 style=\"font-family: Arial\">" 
            html += movies["results"][i]["title"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+ movies["results"][i]["vote_average"] +"</font> </div>";
        }
    }
    else {
        html += "<div style=\"margin-left: 25%; margin-top: 2%\"><h2>No Results</h2></div>";
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
    else {
        html += "<div style=\"margin-left: 25%; margin-top: 2%\"><h2>No Results</h2></div>"
    }
    bodyDiv.innerHTML = html;
};

var filterSearch = function(){
    console.log("filtering");
    var games = results["games"];
    var songs = results["songs"];
    var movies = results["movies"];
    var books = results["books"];
    var html = '';
    var bodyDiv = document.getElementById("searchList");

    if(filt == 1){
        html += "<div style=\"margin-left: 5%\"><h1>Songs</h1></div>";
        for(i = 0; i < songs["tracks"]["items"].length && i < 20; i++){
            //html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/song/" + songs["tracks"]["items"][i]["id"] + "\'\"'><h1>" + songs["tracks"]["items"][i]["name"] + "</h1></div>";     
            html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/song/" 
            html += songs["tracks"]["items"][i]["id"] 
            html += "\'\"'> <img height=\"50px\" src=\"./staticImages/musicIcon.jpg\" align=\"right\"><h3 style=\"font-family: Arial\">" 
            html += songs["tracks"]["items"][i]["name"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+ songs["tracks"]["items"][i]["popularity"]+"</font> </div>";
        }
    }
    else if(filt == 3){
        html += "<div style=\"margin-left: 5%; margin-top: 15px\"><h1>Games</h1></div>";
        for( i = 0; i < games.length && i < 20; i++){
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
    }
    else if(filt == 2){
        html += "<div style=\"margin-left: 5%; margin-top: 15px\"><h1>Movies</h1></div>";
        for (i = 0; i < movies["total_results"] && i < 20; i++){
            //html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/movie/" + movies["results"][i]["id"] + "\'\"'><h1>" + movies["results"][i]["title"] + "</h1></div>";
            html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/movie/" 
            html += movies["results"][i]["id"] 
            html += "\'\"'> <img height=\"50px\" src=\"./staticImages/movieIcon.jpg\" align=\"right\"><h3 style=\"font-family: Arial\">" 
            html += movies["results"][i]["title"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+ movies["results"][i]["vote_average"] +"</font> </div>";
        }
    }
    else if(filt == 4){
        html += "<div style=\"margin-left: 5%; margin-top: 15px\"><h1>Books</h1></div>";
        if(books["GoodreadsResponse"]["search"]["results"]["work"] != null){
            for( i = 0; i < books["GoodreadsResponse"]["search"]["results"]["work"].length && i < 20; i++){
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
    }
    bodyDiv.innerHTML = html;
}
