function load(params) {
  $.getJSON("http://www.reddit.com/.json", params, function (data) {
    var children = data.data.children;
      $.each(children, function (i, post) {
        $("#data").append( '<div class="card"><div class="thumbnail"><a class="title" href="' + post.data.url + '"><img src="' + post.data.thumbnail + '"></a></div><div class="post"><p><a class="title" href="' + post.data.url + '">' + post.data.title + '</a></p><p>submitted by <a target="blank" class="author" href="https://reddit.com/user/' + post.data.author + '">' + post.data.author + '</a> to <a href="https://reddit.com/' + post.data.subreddit_name_prefixed +'">' + post.data.subreddit_name_prefixed + '</a></p><p><a target="blank" href="https://reddit.com' + post.data.permalink + '">View Comments</a></p></div></div>' );
    });
    if (children && children.length > 0) {
        lastId = children[children.length - 1].data.id;
    } else {
        lastId = undefined;
    }
  });
}

function paginate() {
  if (lastId) {
    load({
      after: 't3_' + lastId
    });
  }
};

window.onscroll = function(ev) {
  if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
    setTimeout(function(){ 
		paginate() 
	}, 1000);
  }
};

load();