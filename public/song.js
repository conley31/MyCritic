$.get("https://accounts.spotify.com/authorize/?client_id=2136cc56a70c45608fb9097d77ce7632&response_type=token&redirect_uri=https%3A%2F%2Flocalhost.com:8080/song/%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09", function(data){
	console.log(data);
});
//initilize spotify api
var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('3abb65ea376f4a21b5ea42c8aa0f45f3-2136cc56a70c45608fb9097d77ce7632');

var songName = window.location.pathname;

var songName = songName.slice(6, songName.length);
while(songName.search("%20") != -1){
	var songName = songName.replace("%20", " ");
}

prev = spotifyApi.searchTracks(songName, {limit: 5});
prev.then(function(data) {

	// ...render list of search results...
	console.log(data);

}, function(err) {
	console.error(err);
});