$(document).ready(function() {



// MODEL

	var Todo = Backbone.Model.extend({
	  defaults: {
	    title: '',
	    completed: false,
	  },

	  toggleCompleted : function(){
	  	this.set({completed: !this.get('completed') });
	  },
	  
	});

// VIEW

	var TodoView = Backbone.View.extend({
	  tagName : 'li',
	  template: _.template($('#todo-template').html()),

	  initialize: function(){
	  	this.render	();
	  	$(".todos-list").append(this.el);
	  	this.listenTo(this.model, 'change', this.render);
	  	this.listenTo(this.model, 'destroy', this.remove);
	  },
	  
	  render: function() {
	    this.$el.html(this.template(this.model.toJSON()));
	  },

	  events: {
	  	'click .toggle' : function(){
	  		this.model.toggleCompleted();
	  		if (this.model.get('completed') == true) {
	  			$( ".completed" ).html(function(i, val) { return val*1+1 });
	  			$( ".uncompleted" ).html(function(i, val) { return val*1-1 });
	  		} else {
	  			$( ".completed" ).html(function(i, val) { return val*1-1 });
	  			$( ".uncompleted" ).html(function(i, val) { return val*1+1 });
	  		}
	  	},

	  	'click button.destroy' : function(){
	  		$( ".counter" ).html(function(i, val) { return val*1-1 });
	  		
	  		if (this.model.get('completed') == true) {
	  			$( ".completed" ).html(function(i, val) { return val*1-1 });
	  		} else {
	  			$( ".uncompleted" ).html(function(i, val) { return val*1-1 });
	  		}
	  		
	  		this.remove();
	  	}
	  },

	});

// VIEW	INSTANCE

	$('#new-todo').keypress(function(e){
		var code = (e.which);
 
    	if (code == 13 ) { 
    		var tv = new TodoView({
				model: new Todo({
				    title: $(this).val(),
		    	})
			});
    		$( ".counter" ).html(function(i, val) { return val*1+1 });
    		$( ".uncompleted" ).html(function(i, val) { return val*1+1 });
            $('#new-todo').val('');
		}

	});

});