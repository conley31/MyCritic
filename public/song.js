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
	console.log(token);
	spotifyApi.setAccessToken(token);

	var songName = window.location.pathname;

	var songName = songName.slice(6, songName.length);
	while(songName.search("%20") != -1){
		var songName = songName.replace("%20", " ");
	}
	/*if( songName.search("\\\(") != -1){
		var songName = songName.replace("\\\(", "\n");
	}*/
	/*while(songName.search("\\\)") != -1){
		var songName = songName.replace("\\\)", "");		
	}*/

	console.log(songName);
	var bodyDiv = document.getElementById("songInfo");
	var html = "<h1 style=\"margin-left: 10%\">" + songName + "</h1>";

	prev = spotifyApi.searchTracks(songName, {limit: 5});
	prev.then(function(data) {

		// ...render list of search results...
		console.log(data);
		if(data["tracks"]["items"] != null){
			actualsong = spotifyApi.getTrack(data["tracks"]["items"][0]["id"]);
			actualsong.then(function(data2) {

				// ...render list of search results...
				console.log(data2);
				html += "<h3 style=\"margin-left: 10%\">" + data2["artists"][0]["name"] + "</h3>";
				html += "<h5 style=\"margin-left: 10%\">Popularity " + data2["popularity"] + "</h5>";
				
				bodyDiv.innerHTML = html;
			}, function(err) {
				console.error(err);
			});
		}
	}, function(err) {
		console.error(err);
	});
}