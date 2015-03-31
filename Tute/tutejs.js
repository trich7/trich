

    $(document).ready(function() {
        $('#menu1').dropit();
        $('#menu2').dropit();
        $('#menu3').dropit();
        $('#menu4').dropit();
        $('#menu5').dropit();
    });

jQuery(document).ready(function() {

	var offset   = 220;
	var duration = 500;
	
	jQuery(window).scroll(function() {
		if (jQuery(this).scrollTop() > offset)
		{
			jQuery('.back-to-top').fadeIn(duration);
		}
		else
		{
			jQuery('.back-to-top').fadeOut(duration);
		}
	});
	
	jQuery('.back-to-top').click(function(event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop: 0}, duration);
		return false;
	});
	
	jQuery('.mobile-menu').click(function() {
		jQuery('.mobile-menu-options').slideToggle();
	});
	
	jQuery('.mobile-button').click(function() {
		jQuery('.mobile-menu-options').slideToggle();
	});
	
	jQuery('.team-pics').hover(function() {
		jQuery(this).find('.company-name').toggleClass("displayshow");
	});
	
	jQuery('.team-pics').on('click', function() {
		var jTargetElement = jQuery('.team-bio.'+jQuery(this).attr('href'));
		var jActiveElement = jQuery(".team-bio.active");
		
		if (jActiveElement.length)
		{
			var activeType = jActiveElement.closest('.bio-type').attr('id');
			var targetType = jTargetElement.closest('.bio-type').attr('id');
			
			if (activeType == targetType)
			{
				var displayTarget = !jTargetElement.hasClass('active');
				
				jActiveElement.removeClass('active').slideUp('fast', function() {
					if (displayTarget) jTargetElement.slideDown('fast').addClass('active');
				});
			}
			else
			{
				jActiveElement.removeClass('active').slideUp('fast');
				jTargetElement.slideDown('fast').addClass('active');
			}
		}
		else
		{
			jTargetElement.slideDown('fast').addClass('active');
		}
		
		return false;
	});
	
	jQuery('#la').click(function() {
		jQuery(".la,#la-map").show();
		jQuery(".provo,.slc,#slc-map,#provo-map").hide();
	});
	
	jQuery('#provo').click(function() {
		jQuery(".provo,#provo-map").show();
		jQuery(".slc,.la,#slc-map,#la-map").hide();
	});
	
	jQuery('#slc').click(function() {
		jQuery(".slc,#slc-map").show();
		jQuery(".provo,.la,#provo-map,#la-map").hide();
	});
	
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
	
});