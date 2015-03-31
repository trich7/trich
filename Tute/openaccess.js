$(document).ready(function() {
	
	$('#joinopen').on('click', function() {
		$(".open-form").slideToggle();
	});

	$('#joinopen1').on('click', function() {
		$("html, body").animate({ scrollTop: $('#openaccess').offset().top }, 1000);
	});
	
	$('#provo').click(function() {
		$(".provo,#provo-map").show();
		$(".slc,.la,#slc-map,#la-map").hide();
	});
	
	$('#slc').click(function() {
		$(".slc,#slc-map").show();
		$(".provo,.la,#provo-map,#la-map").hide();
	});
	
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname)
		{
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				
				return false;
			}
		}
	});
	
});