var GRAPI = "GhFElaxrPCsozAErWzDA";
	
var request = new XMLHttpRequest();
request.open('GET', "/getBook/");
request.responseType = 'text';
var token = "";
request.onload = function() {
  token = request.response;
};
request.send();

/*$.getJSON("https://www.goodreads.com/book/title.json?key=" + GRAPI + "&title=" + bookName, function(json){
	console.log(json);
});*/