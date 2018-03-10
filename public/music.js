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
    var count = 0;
    for(var i = 0; i < 50; i++){
       // html += "<div id=\"" + i + "\" style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/song/" + trackObj[i].tracks.items[0].id + "\'\"'><h1>" + trackObj[i].tracks.items[0].name + "</h1></div>";
        if(trackObj[i] != null && trackObj[i].tracks != null && trackObj[i].tracks.items[0] != undefined){
        html += "<div id=\""+count+"\"onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'; this.style.cursor=\'pointer\' \" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/song/"
       			html += trackObj[i].tracks.items[0].id
        		html += "\'\"'> <img height=\"50px\" src=\"./staticImages/musicIcon.jpg\" align=\"right\"><h3 style=\"font-family: Arial\">"
        		html += trackObj[i].tracks.items[0].name + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+trackObj[i].tracks.items[0].popularity+"</font> </div>";
           count++;
        }
    }
    bodyDiv.innerHTML = html;
            loadingDiv.style.visibility = "hidden";

}

