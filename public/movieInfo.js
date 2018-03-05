var request = new XMLHttpRequest();
request.open('GET', "/getMovie");
request.responseType = 'json';
request.onload = function() {
	var bodydiv = document.getElementById("movInfo");
	json = request.response;
    //var json = JSON.parse(movieObj);
    console.log(json);

	var html = "";

		html += "<h1 style=\"font-size: 3.5em; text-align: center; margin-top: 3%\">" + json["title"] + "</h1>";

        html += "<div width=\"60%\" style=\"margin-top: 5%; margin-left: 24%\">";
        
        html += "<img style=\"height: 500px; float: left; margin-right: 8%;\" src=\"https://image.tmdb.org/t/p/w500/" + json["poster_path"] + "\" />";


		html += "<h3 style=\"font-size: 2em; margin-bottom: 3%; font-family: arial; width: 80%;\">average score: <font color=\"#78dc52\">" + json["vote_average"] + "</font></h3>";

		html += "<h5 style=\"font-family: arial; font-size: 1.4em; width: 70%; margin-bottom: 4%;\">" + json["overview"] + "</h5>";

		html += "<h5 style=\"font-family: arial; color: #6297bc; font-size: 1.4em; width: 70%;\">release date - " + json["release_date"] + "</h5>";

		html += "<h5 style=\"font-family: arial; color: #ee5622; font-size: 1.4em; width: 70%;\">runtime - " + json["runtime"] + " minutes</h5>";
        //html += "</p>";


        html += "</div>";

        console.log(html);
	    bodydiv.innerHTML = html;
};	
request.send();
