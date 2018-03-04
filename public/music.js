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
var loadingDiv = document.getElementById("loadingDiv");
var html = "";

var songList = function(){
	spotifyApi.setAccessToken(token);
	//get the top 50 songs and display them
	$.getJSON('https://itunes.apple.com/us/rss/topsongs/limit=25/json', async function(json){
		for( i = 0; i < 25; i++){
			var song = json["feed"]["entry"][i]["im:name"]["label"];
			var tempSong = song;
			if(song.indexOf("(feat.") != -1){
				tempSong = song.slice(0, song.indexOf("(feat."))
			}
			console.log(tempSong);
            loadingDiv.innerHTML = "<center>Loading...</center>";
			await spotifyApi.searchTracks(tempSong, {limit: 1, artist: json["feed"]["entry"][i]["im:artist"]["label"]}).then(function(data) {
				html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'; this.style.cursor=\'pointer\' \" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/song/"
       			html += data["tracks"]["items"][0]["id"]
        		html += "\'\"'> <img height=\"50px\" src=\"./staticImages/musicIcon.jpg\" align=\"right\"><h3 style=\"font-family: Arial\">"
        		html += data["tracks"]["items"][0]["name"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+data["tracks"]["items"][0]["popularity"]+"</font> </div>";
			});
		}
        loadingDiv.style.visibility = "hidden";
		bodyDiv.innerHTML = html;
	});
}
