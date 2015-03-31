$(document).ready(function() {

	function convert_value_to_string(value) {
		if (value > 10 || value < 2 ) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
				case 1:
				return 'Ace';
				break;
			}
		}
		return value.toString();
	}

	var cardModel = Backbone.Model.extend({
	  defaults: {
	  	value: 0,
	    suit: '',
	    str_value: ''
	  },
	  
	});

	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push(new cardModel ({ 
					value: j+1,
		    		suit: suit,
		    		str_value: convert_value_to_string(j+1),
				}));
		}
	}


	var cardView = Backbone.View.extend({
		model: cardModel,
		tagName : 'div',
		template: _.template($('#card-template').html()),
		
		render: function() {
	    this.$el.html(this.template(this.model.toJSON()));

	  	},

	});

	var my_view = new cardView({
			el:$('#my-card'),
			model: cardModel,
		});
	var opp_view = new cardView({
			el:$('#opp-card'),
			model: cardModel,
		});

	var my_deck = [];
	var opp_deck = [];

	$('.deal').click(function(){
		
		deck = _.shuffle(deck);
		my_deck = deck.splice(0, deck.length/2 );
		opp_deck = deck;
		$( ".counter2 b" ).html( my_deck.length + ' cards');
		$( ".counter1 b" ).html( opp_deck.length + ' cards');
	});

	function war(){
		var card_mine = my_deck[0];
		var card_opp = opp_deck[0];
		var card_mine1 = my_deck[1];
		var card_opp1 = opp_deck[1];
			if (card_mine.get('value') == card_opp.get('value')) {
				alert("It's a war");
				if (card_mine1.get('value') > card_opp1.get('value')) {
					var card_opp2 = opp_deck.splice(0,3);
					my_deck.push(card_opp2);
					alert('You won the tie');
					} else {
					var card_mine2 = my_deck.splice(0,3);
					opp_deck.splice(card_mine2);
					alert('Computer won the tie');
				}
			} else {
				if (card_mine.get('value') > card_opp.get('value')) {
					my_deck.splice(0,1);
					opp_deck.splice(0,1);
					my_deck.push(card_mine, card_opp);
					alert('You won');
					} else {
						my_deck.splice(0,1);
						opp_deck.splice(0,1);
						opp_deck.push(card_mine, card_opp);
						alert('Computer won');
				}
			}
		console.log(card_mine);
		console.log(card_opp);
	};

	$('.play').click(function(){
		function advance() {
			opp_view.model = opp_deck[0];
			my_view.model = my_deck[0];
			opp_view.render();
			my_view.render();
			console.log("my cards", my_deck.length, "opp's cards", opp_deck.length);
		};
		advance();
		war();
		$( ".counter2 b" ).html( my_deck.length + ' cards');
		$( ".counter1 b" ).html( opp_deck.length + ' cards');
		if (my_deck.length == 0) { winner(); };
		if (opp_deck.length == 0) { winner(); };
	});

	$('.rules').click(function(){
		$('.rule-box').slideToggle();
	});


});