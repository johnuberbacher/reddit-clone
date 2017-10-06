$('document').ready(function() {
  var frontpage = "https://www.reddit.com/.json";
  
  $.getJSON(frontpage, function(data) {
	$.each(
	  data.data.children.slice(0, 15),
	  
	  function (i, post) {
	    $("#data").append( '<div class="card"><div class="thumbnail"><a class="title" href="' + post.data.url + '"><img src="' + post.data.thumbnail + '"></a></div><div class="post"><p><a class="title" href="' + post.data.url + '">' + post.data.title + '</a></p><p>submitted by <a target="blank" class="author" href="https://reddit.com/user/' + post.data.author + '">' + post.data.author + '</a> to <a href="https://reddit.com/' + post.data.subreddit_name_prefixed +'">' + post.data.subreddit_name_prefixed + '</a></p><p><a target="blank" href="https://reddit.com' + post.data.permalink + '">View Comments</a></p></div></div>' );
	  }
	  
	)
  })
  
}); 