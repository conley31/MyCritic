var request = new XMLHttpRequest();
request.open('GET', "/access");
request.responseType = 'text';
var token = "";
request.onload = function() {
  token = request.response;
  songInfo();
};

request.send();
var songInfo = function(){
	//initilize spotify api
	var spotifyApi = new SpotifyWebApi();
	spotifyApi.setAccessToken(token);

	var songName = window.location.pathname;

	var songName = songName.slice(6, songName.length);
	/*if( songName.search("\\\(") != -1){
		var songName = songName.replace("\\\(", "\n");
	}*/
	/*while(songName.search("\\\)") != -1){
		var songName = songName.replace("\\\)", "");		
	}*/

	console.log(songName);
	var bodyDiv = document.getElementById("songInfo");

	prev = spotifyApi.getTrack(songName);
	prev.then(function(data) {
			var html = "<h1 style=\"margin-left: 10%\">" + data["name"] + "</h1>";
		html += "<h3 style=\"margin-left: 10%\">" + data["artists"][0]["name"] + "</h3>";
		html += "<h5 style=\"margin-left: 10%\">Popularity " + data["popularity"] + "</h5>";
				
		bodyDiv.innerHTML = html;
		// ...render list of search results...
		console.log(data);
	
	}, function(err) {
		console.error(err);
	});
}