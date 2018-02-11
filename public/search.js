//Launch search page when enters pressed
$('#searchBar').keypress(function() {
	if(event.keyCode == 13){
		//console.log("hello");
		//get the searchpage from the server
		var query = document.getElementById('searchBar').value;
		var request = new XMLHttpRequest();
		request.open('GET', "/search?search=" + query);
		request.send();
	}
});