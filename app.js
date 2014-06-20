var HtmlSnippet = Backbone.Model.extend({
	defaults:{
		title:'default title',
		description:''
	}
});

var TargetLocation = HtmlSnippet.extend({
	defaults:{
		associatedUrl:'www.google.com',
		element:'body'
	}
});

var HTML = HtmlSnippet.extend({
	defaults:{
		code:'<p> some code </p>',
		notes:''
	}
});

var HtmlSnippets = Backbone.Collection.extend({
	model:HtmlSnippet
});

var htmlSnippets = new HtmlSnippets();


var HtmlSnippetListView = Backbone.View.extend({
	template:_.template($('#HtmlSnippetsList').html()),
	initialize:function(){
		var self = this;
		htmlSnippets.bind('add',function(){
			self.render();
		});
		this.render();
	},
	render:function(){
		this.$el.html(this.template({htmlSnippets:htmlSnippets.models}));
		return this;
	}
});

var HtmlSnippetEditorView = Backbone.View.extend({
	events: {
	  'click button#addSnippet': 'addSnippet'
	},
	template:_.template($('#snippetEditor').html()),
	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html( this.template());
		return this;
	},
	addSnippet: function(e){
		e.preventDefault(); 
		var formData = {};
		var htmlSnippet = new HtmlSnippet();
		_.each(this.$('form').serializeArray(), function(input){
			formData[input.name] = input.value;
			htmlSnippet.set(formData);
		});		
  	    htmlSnippets.add(htmlSnippet);
  	    $('form')[0].reset();
	}

});

var DomEditorView = Backbone.View.extend({
	el:$("#app"),
	template:_.template($('#domEditor').html()),
	initialize: function(){
		this.render();
	},
	render: function(){
		this.$el.html( this.template());
		new HtmlSnippetEditorView({ el: this.$('#snippetEditorContainer') });
		new HtmlSnippetListView({ el: this.$('#HtmlSnippetsListContainer') });
		return this;
	}
});

var domEditor = new DomEditorView();
























