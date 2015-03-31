$(document).ready(function() {

	$.ajax('https://api.parse.com/1/classes/NewsItem', 
  		{
    	beforeSend: function(request) {
      		request.setRequestHeader('X-Parse-Application-Id', 'KoippzAptb1PJ2zuGdi50ktwNpS5wbXflFpTlGNl');
            request.setRequestHeader('X-Parse-REST-API-Key', 'JlFGu6SrN8v4mCPDgiArv5mZkPgRjX2PhDaYSI6t');
        }
    }
    ).done(function(response) {
    	for(var i = 0; i<response.results.length; i++) {
			var newnews = response.results[i];
			$('.allnews').prepend('<div class="newsfeed"><h1>'+newnews.title+'</h1><span class="name">By: '+newnews.name+' </span><span class="date">'+newnews.createdAt+'</span><p>'+newnews.body+'</p></div>');
		}
	});

	$('.add').click(function() {
		var titlevar = $('.newtitle').val();
		var bodyvar = $('.newbody').val();
		var namevar = $('.newname').val();
		if ( titlevar == 0 || bodyvar == 0 ) {
			alert('You need to fill out both title and article sections');
		} else {
			$.ajax({
				type: "POST",
				url: "https://api.parse.com/1/classes/NewsItem/",
				data: JSON.stringify({
						"name" : namevar,
						"title" : titlevar, 
						"body" : bodyvar 
					}),
				dataType: "json",
				beforeSend: function(request) {
					request.setRequestHeader('X-Parse-Application-Id', 'KoippzAptb1PJ2zuGdi50ktwNpS5wbXflFpTlGNl');
	            	request.setRequestHeader('X-Parse-REST-API-Key', 'JlFGu6SrN8v4mCPDgiArv5mZkPgRjX2PhDaYSI6t');
					request.setRequestHeader('Content-Type', 'application/json');
				}
			})
		}
	});

	$('.open').click(function(){
		$('.news-click').hide(); 
		$('.news-form').slideToggle();
	});

	$('.nm').click(function(){
		$('.news-click').show(); 
		$('.news-form').slideToggle();
	});

});