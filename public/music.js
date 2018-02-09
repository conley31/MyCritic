
//get the top 50 songs and display them
$.getJSON('https://itunes.apple.com/us/rss/topsongs/limit=50/json', function(json){
	var bodyDiv = document.getElementById("songList");
	var html = "";
	for( i = 0; i < 50; i++){
		html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/song/" + json["feed"]["entry"][i]["im:name"]["label"] + "\'\"'><h1>" + json["feed"]["entry"][i]["im:name"]["label"] + "</h1></div>";
	}
	bodyDiv.innerHTML = html;
});


