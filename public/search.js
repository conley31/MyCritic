//Launch search page when enters pressed
/*
$('searchBar').on('keyup', function(event) {
	if(event.keyCode == 13){
		//console.log("hello");
		//get the searchpage from the server
		var query = document.getElementById('searchBar').value;
		var request = new XMLHttpRequest();
		request.open('GET', "/search?search=" + query);
		request.send();
	}
});
*/
document.getElementById("searchBar").addEventListener("keyup", function(event) {
    
    event.preventDefault();
    if (event.keyCode === 13) {
        var query = document.getElementById('searchBar').value;
		var request = new XMLHttpRequest();
		request.open('GET', "/searchQ?search=" + query);
        request.onload = function(){
        window.location = request.response;
        };
		request.send();


    }
});
