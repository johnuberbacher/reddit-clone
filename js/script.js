function load(params) {
  $.getJSON("http://www.reddit.com/.json?", params, function (data) {
    var children = data.data.children;
	
    if (children && children.length > 0) { 
        lastId = children[children.length - 1].data.id;
    } else {
        lastId = undefined;
    }
	
    $.each(children, function (i, post) {
		  
		// Placeholders for self/nsfw posts
		if (post.data.thumbnail == "image" || post.data.thumbnail == "self" || post.data.thumbnail == "default")  {
			post.data.thumbnail = "img/self.png"
		} else if (post.data.thumbnail == "nsfw") {
			post.data.thumbnail = "img/nsfw.png"
		}

		$("#data").append( '<div class="card"><div class="thumbnail"><a class="title" href="' + post.data.url + '"><img src="' + post.data.thumbnail + '"></a></div><div class="post"><p><a class="title" href="' + post.data.url + '">' + post.data.title + '</a>&nbsp; (' + post.data.domain + ')</p><p>submitted by <a target="blank" class="author" href="https://reddit.com/user/' + post.data.author + '">' + post.data.author + '</a> to <a class="subreddit" href="https://reddit.com/' + post.data.subreddit_name_prefixed +'">' + post.data.subreddit_name_prefixed + '</a></p><p><a target="blank" href="https://reddit.com' + post.data.permalink + '">View Comments</a></p></div></div>' );
		
    });
	
	$(".title").click(function(e) {
        e.preventDefault();
		var str = $(this).attr("href");
		var dotIndex = str.lastIndexOf('.');
		var ext = str.substring(dotIndex);
		if (ext == ".jpg" || ext == ".png" || ext == ".jpeg" || ext == ".gifv" || ext == ".gif")  {
			$("#modal").append( '<div class="modal-overlay"><img src="' + str + '"></div> ');
		} else {
			$("#modal").append( '<div class="modal-overlay"><iframe name="iframe"></iframe></div> ');
			$("iframe").attr("src", $(this).attr("href"));
		}
	    $('#modal').toggleClass('is-visible');
    })
	
	$('.modal').click(function(event){
	  $('#modal').toggleClass('is-visible');
	  $('.modal-overlay').remove(); 
	});

	$('.modal-overlay').click(function(event){
		event.stopPropagation();
	});
	
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
