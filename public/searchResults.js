var request = new XMLHttpRequest();
request.open('GET', '/searchResults');
request.responseType = 'json';
request.onload = function() {
    results = request.response;
    populateHtml();
};

request.send();

var populateHtml = function(){
    var games = JSON.parse(results["games"]);
    var songs = results["songs"];
    console.log(songs);
    console.log(games);
    var html = '';
    var bodyDiv = document.getElementById("searchList");
   
    //list songs
    html += "<div style=\"margin-left: 5%\"><h1>Songs</h1></div>";
    for(i = 0; i < songs["tracks"]["items"].length; i++){
        html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/song/" + songs["tracks"]["items"][i]["id"] + "\'\"'><h1>" + songs["tracks"]["items"][i]["name"] + "</h1></div>";     
    }

    //list games
    html += "<div style=\"margin-left: 5%; margin-top: 15px\"><h1>Games</h1></div>";
    for( i = 0; i < 5; i++){
        html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/gameTitle/" + games[i]["id"] + "\'\"'><h1>" + games[i]["name"] + "</h1></div>";
    }
    bodyDiv.innerHTML = html;
}
