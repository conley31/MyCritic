//get movies currently in theaters
$.getJSON('https://api.themoviedb.org/3/discover/movie?api_key=d26e26ba96250fb462f04e8c480e3351&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2018-01-15&primary_release_date.lte=2018-02-08', function(json){
	var bodyDiv = document.getElementById("movieList");
	var html = "";
	for ( i = 0; i < 20; i++) {
		html += "<div style=\"margin-left: 10%; border-bottom-style: solid, border-width: 2px\"; onclick=\"window.location=\'/movie/'" + json["feed"]["entry"][i]["im:name"]["label"] + "\'\"'><h1>" + json["feed"]["entry"][i]["im:name"]["label"] + "</h1></div>";
	}
	bodyDiv.innerHtml = html;
});
