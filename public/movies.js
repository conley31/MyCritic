//get movies currently in theaters
var request = new XMLHttpRequest();
request.open('GET', "/accessNewMovies");
request.responseType = 'text';
var newMoviesList;
var loadingDiv = document.getElementById("loadingDiv");
loadingDiv.innerHTML = "<center>Loading...</center>";
request.onload = function(){
    newMoviesList = request.response;
    populateHtml();
};
request.send();

var populateHtml = function(){
	var bodyDiv = document.getElementById("movieList");
    var json = JSON.parse(newMoviesList);
    
	var html = "";
	for ( i = 0; i < 20; i++) {
		html += "<div id=\""+ i +"\"onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'; this.style.cursor=\'pointer\' \" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/movie/"
        html += json["results"][i]["id"]
        html += "\'\"'> <img height=\"50px\" src=\"./staticImages/movieIcon.jpg\" align=\"right\"><h3 style=\"font-family: Arial\">"
        html += json["results"][i]["title"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : <span id=\"voteAverage\" style=\"display: inline\">"+ parseInt(json["results"][i]["vote_average"]).toFixed(0) +"</span></font> </div>";
	}

	bodyDiv.innerHTML = html;
    loadingDiv.style.visibility = "hidden";
}

