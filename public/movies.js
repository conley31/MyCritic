//get movies currently in theaters
$.getJSON('https://api.themoviedb.org/3/discover/movie?api_key=d26e26ba96250fb462f04e8c480e3351&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2018-01-15&primary_release_date.lte=2018-02-08', function(json){
	var bodyDiv = document.getElementById("movieList");
console.log(bodyDiv);
	var html = "";
	console.log(json);
	for ( i = 0; i < 20; i++) {
		html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/movie/"
        html += json["results"][i]["id"]
        html += "\'\"'> <img height=\"50px\" src=\"./staticImages/movieIcon.jpg\" align=\"right\"><h3 style=\"font-family: Arial\">"
        html += json["results"][i]["title"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+ parseInt(json["results"][i]["popularity"]).toFixed(0) +"</font> </div>";
	}

	console.log(html);
	bodyDiv.innerHTML = html;

});
