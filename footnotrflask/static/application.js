$(document).ready (function(){

	window.Annotation = Backbone.Model.extend({
		defaults: {
			articleTitle: "Article Title",
			quote: "Quote from the Article Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab nemo a non.",
			userComment: "A Comment made by current user",

		}
	});

	window.QuoteSlugs = Backbone.Collection.extend({
		model: Annotation


	});

	window.QuoteSlugView = Backbone.View.extend({

		initialize: function() {
			this.model.on('change', this.render, this);
		},

		tagName: 'li',

		className: 'quote-summary',

		render: function () {
			var quoteSummaryTemplate = $('#quote-slug-template').html();
			var modelObj = {
				quoteSlug: this.model.get('quote'), //TODO:only get 1st 12ish words
				articleTitle: this.model.get('articleTitle'),
				commentSlug: this.model.get('userComment') //TODO: only get 1st n words
				};

			var templatedHtml  = _.template(quoteSummaryTemplate, modelObj);
			$(this.el).html(templatedHtml);

			return this;
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





});