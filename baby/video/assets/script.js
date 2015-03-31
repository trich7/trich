
$(document).ready(function() {


	$('body2').videoBG({
		position:"fixed",
		zIndex:0,
		mp4:'assets/christmas_snow.mp4',
		ogv:'assets/christmas_snow.ogv',
		webm:'assets/christmas_snow.webm',
		poster:'assets/christmas_snow.jpg',
		opacity:1,
		fullscreen:true,
	});
	
	
	$('.clock-bg').videoBG({
		mp4:'video/assets/reveal.mp4',
		ogv:'video/assets/reveal.ogv',
		webm:'video/assets/reveal.webm',
		poster:'video/assets/Reveal.jpg',
		scale:true,
		zIndex:0,
	});

	$("video").prop('muted', true);
	
	$('#text_replacement_demo').videoBG({
		mp4:'assets/text_replacement.mp4',
		ogv:'assets/text_replacement.ogv',
		webm:'assets/text_replacement.webm',
		poster:'assets/text_replacement.png',
		textReplacement:true,
		width:760,
		height:24
	});
		
})