//Launch search page when enters pressed
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
