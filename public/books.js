var request = new XMLHttpRequest();
request.open('GET', "/accessTopBooks");
request.responseType = 'text';
var bookObj;
request.onload = function(){
    bookObj = JSON.parse(request.response);
    populateHtml();
}
request.send();

var populateHtml = function(){
    var bodyDiv = document.getElementById("bookList");
    var loadingDiv =  document.getElementById("loadingDiv");
    console.log(bookObj[0]["GoodreadsResponse"]);
    var html = "";
    console.log(bookObj);
    for(var i = 0; i < 20; i++){
        if(bookObj[i]["GoodreadsResponse"] != undefined){
            if(bookObj[i]["GoodreadsResponse"]["book"]["title"]["_text"] == null){
                html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/bookInfo/"
                html += bookObj[i]["GoodreadsResponse"]["book"]["id"]["_text"]
                html += "\'\"'> <img height=\"50px\" src=\"./staticImages/bookIcon.png\" align=\"right\"><h3 style=\"font-family: Arial\">"
                html += bookObj[i]["GoodreadsResponse"]["book"]["title"]["_cdata"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+bookObj[i]["GoodreadsResponse"]["book"]["average_rating"]["_text"]+"</font> </div>";
            }
            else{
                html += "<div onmouseout=\"this.style.color=\'black\'\" onmouseover=\"this.style.color=\'#4b6d93\'\" style=\"margin-left: 25%; margin-bottom: 2%; width: 50%; background-color: \'white\';\"; onclick=\"window.location=\'/bookInfo/"
                html += bookObj[i]["GoodreadsResponse"]["book"]["id"]["_text"]
                html += "\'\"'> <img height=\"50px\" src=\"./staticImages/bookIcon.png\" align=\"right\"><h3 style=\"font-family: Arial\">"
                html += bookObj[i]["GoodreadsResponse"]["book"]["title"]["_text"] + "</h3> <font color=\"#dd4300\"> Average Score</font> : "+bookObj[i]["GoodreadsResponse"]["book"]["average_rating"]["_text"]+"</font> </div>";
	  
            }
        }
	
	}
    loadingDiv.style.visibility = "hidden";
    bodyDiv.innerHTML = html;
}
