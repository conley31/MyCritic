//GET Spotify api Key
var spotifyApi = new SpotifyWebApi();

var request = new XMLHttpRequest();
request.open('GET', "/access");
request.responseType = 'text';
var token = "";
request.onload = function() {
  token = request.response;
  songList();
};

request.send();
var bodyDiv = document.getElementById("songList");
var html = "";

var songList = function(){
	spotifyApi.setAccessToken(token);
	//get the top 50 songs and display them
	$.getJSON('https://itunes.apple.com/us/rss/topsongs/limit=50/json', async function(json){
		for( i = 0; i < 50; i++){
			var song = json["feed"]["entry"][i]["im:name"]["label"];
			var tempSong = song;
			if(song.indexOf("(feat.") != -1){
				tempSong = song.slice(0, song.indexOf("(feat."))
			}
			await spotifyApi.searchTracks(tempSong, {limit: 5, artist: json["feed"]["entry"][i]["im:artist"]["label"]}).then(function(data) {
				html += "<div id=\"" + i + "\" style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/song/" + data["tracks"]["items"][0]["id"] + "\'\"'><h1>" + data["tracks"]["items"][0]["name"] + "</h1></div>";
			});
		}
		bodyDiv.innerHTML = html;
	});
}


