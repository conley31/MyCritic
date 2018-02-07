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
	while(songName.search("\(") != -1){
		var songName = songName.replace("(", "");
	}
	while(songName.search("\)") != -1){
		var songName = songName.replace(")", "");		
	}

	console.log(songName);

	prev = spotifyApi.searchTracks(songName, {limit: 5});
	prev.then(function(data) {

		// ...render list of search results...
		console.log(data);

	}, function(err) {
		console.error(err);
	});
}