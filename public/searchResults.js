var request = new XMLHttpRequest();
request.open('GET', '/searchResults');
request.responseType = 'text';
request.onload = function() {
    results = request.response;
    populateHtml();
};

request.send();

var populateHtml = function(){
    var json = JSON.parse(results);
    var games = JSON.parse(json['games']);
    console.log(games);
    console.log(games[0]);
    var html = '';
    var bodyDiv = document.getElementById("searchList");
    for( i = 0; i < 5; i++){
        html += "<div style=\"margin-left: 10%; border-bottom-style: solid; border-width: 2px\"; onclick=\"window.location=\'/gameTitle/" + games[i].id + "\'\"'><h1>" + games[i].name+ "</h1></div>";
    }
    bodyDiv.innerHTML = html;
}
