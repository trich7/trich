$(document).ready(function() {
        $( '.insta-text' ).hide();
        $( '.insta' ).hover(function() {
                $( '.insta-text' ).slideToggle("fast","swing");}
        );

        $( '.baby-stat-text' ).hide();
        $( '.baby-stats' ).hover(function() {
                $( '.baby-stat-text' ).slideToggle("fast","swing");}
        );

        $( '.comment-link-text' ).hide();
        $( '.comment-button' ).hover(function() {
                $( '.comment-link-text' ).slideToggle("fast","swing");}
        );

        jQuery('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname)
		{
			var target = jQuery(this.hash);
			target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				jQuery('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				
				return false;
			}
		}
		});

		$.ajax('https://api.parse.com/1/classes/NewsItem', 
	  		{
	    	beforeSend: function(request) {
	      		request.setRequestHeader('X-Parse-Application-Id', 'KoippzAptb1PJ2zuGdi50ktwNpS5wbXflFpTlGNl');
	            request.setRequestHeader('X-Parse-REST-API-Key', 'JlFGu6SrN8v4mCPDgiArv5mZkPgRjX2PhDaYSI6t');
	            request.setRequestHeader('Content-Type', 'application/json');
	        }
	    }
	    ).done(function(response) {
	    	for(var i = 0; i<response.results.length; i++) {
				var newnews = response.results[i];
				$('.allcomments').prepend('<div class="commentsfeed"><h1 class="name">'+newnews.name+' </h1><p>'+newnews.body+'</p></div><hr>');
			}
		});

		$('.add').click(function() {
			var bodyvar = $('.newbody').val();
			var namevar = $('.newname').val();
			if ( namevar == 0 || bodyvar == 0 ) {
				alert('You need to fill out both name and comment sections');
			} else {
				$.ajax({
					type: "POST",
					url: "https://api.parse.com/1/classes/NewsItem/",
					data: JSON.stringify({
							"name" : namevar,
							"body" : bodyvar 
						}),
					dataType: "json",
					beforeSend: function(request) {
						request.setRequestHeader('X-Parse-Application-Id', 'KoippzAptb1PJ2zuGdi50ktwNpS5wbXflFpTlGNl');
		            	request.setRequestHeader('X-Parse-REST-API-Key', 'JlFGu6SrN8v4mCPDgiArv5mZkPgRjX2PhDaYSI6t');
						request.setRequestHeader('Content-Type', 'application/json');
					}
				})
				location.reload(true);
			};
		});

		$('.delete').click(function(){
			var invFriend = Parse.Object.extend("invFriend");
			var query = new Parse.Query(invFriend);
			query.get("efgh", {
			  success: function(myObj) {
			    // The object was retrieved successfully.
			    myObj.destroy({});
			  },
			  error: function(object, error) {
			    // The object was not retrieved successfully.
			    // error is a Parse.Error with an error code and description.
			  }
			});
		});

		var offset = 220;
	    var duration = 500;
	    jQuery(window).scroll(function() {
	        if (jQuery(this).scrollTop() > offset) {
	            jQuery('.back-to-top').fadeIn(duration);
	        } else {
	            jQuery('.back-to-top').fadeOut(duration);
	        }
	    });
	    
	    jQuery('.back-to-top').click(function(event) {
	        event.preventDefault();
	        jQuery('html, body').animate({scrollTop: 0}, duration);
	        return false;
	    })
});