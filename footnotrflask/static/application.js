$(document).ready (function(){

	window.Comment = Backbone.RelationalModel.extend({

	});

	window.Annotation = Backbone.RelationalModel.extend({
		defaults: {
			article: "Article Title",
			quote: "Quote from the Article Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab nemo a non.",
			comment: "A Comment made by current user",
			//username: "testuser", this is actually user who CREATED annot, not commment
			xml: "XML String of the Annot"

		},
		relations: [{
			type: Backbone.HasMany,
			key:'comments',
			relatedModel:'window.Comment',
			reverseRelation: {
				key: 'annotation'
			}
		}]
	});


	window.QuoteSlugs = Backbone.Collection.extend({
		
		url: function() { return "http://127.0.0.1:8000/user-comments/" + this.userId + "/"; },

		model: Annotation,

		userId: ""


	});

	window.UserComments = Backbone.RelationalModel.extend({

		urlRoot: '/user-comments',
		idAttribute: '_id',
		relations: [{

			type: Backbone.HasMany,
			key: 'annotations',
			relatedModel: window.Annotation,

		}]

	});

	window.QuoteSlugView = Backbone.View.extend({

		events: {
			'click': 'showAnnotation'
		},

		initialize: function() {
			this.model.on('change', this.render, this);
		},

		tagName: 'li',

		className: 'quote-summary',

		render: function () {
			var quoteSummaryTemplate = $('#quote-slug-template').html();
			var modelObj = {
				quoteSlug: this.model.get('xml'), //TODO:only get 1st 12ish words
				articleTitle: this.model.get('article'),
				commentSlug: this.model.get('comment').split(" ").splice(0,12).join(" ") + "...", //TODO: only get 1st n words
				userName: this.model.get('username')
				};

			var templatedHtml  = _.template(quoteSummaryTemplate, modelObj);
			$(this.el).html(templatedHtml);

			return this;
		},

		showAnnotation: function() {
			$('#username-header').html(this.model.get('username'));
			$('h4 span.selected').removeClass('selected');
			$(this.el).find('h4 span').addClass('selected');
			window.currentAnnotation = new AnnotationDetailView({ model:this.model });
			currentAnnotation.render();
		}	

	});


	window.QuoteSlugListView = Backbone.View.extend({

		el: $('#left-column ul#quote-summaries'),

		render: function() {
			this.collection.each(function(quoteSlug) {

				var qsView = new QuoteSlugView({ model:quoteSlug });
				$('#left-column ul').append(qsView.render().el);
			});
			
		}
	});

	window.CommentView = Backbone.View.extend({

		tagName: 'div',

		className: 'comment-cont',

		render: function () {
			var commentTemplate = $('#comment-template').html();
			var modelObj = {
				commentText: this.model.get('comment'),
				userName: this.model.get('username')
				};

			var templatedHtml  = _.template(commentTemplate, modelObj);
			$(this.el).html(templatedHtml);

			return this;
		}


	});

	window.AnnotationDetailView = Backbone.View.extend({

		initialize: function() {
			this.model.on('change', this.render, this);
		},

		el: $('div#full-blockquote'),

		render: function () {
			var quoteSummaryTemplate = $('#article-blockquote-template').html();
			var modelObj = {
				fullQuoteText: this.model.get('xml'), 
				articleTitle: this.model.get('article'),	
			};

			var templatedHtml  = _.template(quoteSummaryTemplate, modelObj);
			$(this.el).html(templatedHtml);

			$('#comment-thread').empty();
			this.model.attributes.comments.each(function(comment) {

				var commentView = new CommentView({ model:comment });
				
				$('#comment-thread').append(commentView.render().el);
			});

			return this;
		}

	});





});