//GET Spotify api Key
var request = new XMLHttpRequest();
request.open('GET','/accessTopMusic');
request.responseType = 'json';
var trackObj;
request.onload = function(){
    trackObj = request.response;
    populateHtml();
}
request.send();

var populateHtml = function(){
    var bodyDiv = document.getElementById("songList");
    var html = "";
    for(var i = 0; i < 50; i++){
        html += "<div id=\"" + i + "\" style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/song/" + trackObj[i].tracks.items[0].id + "\'\"'><h1>" + trackObj[i].tracks.items[0].name + "</h1></div>";

    }
    bodyDiv.innerHTML = html;
}

