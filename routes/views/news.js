var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'news';
//	locals.filters = {
//		news: req.params.news,
//	};
	locals.data = {
		news: [],
	};

	// Load news items
	view.on('init', function (next) {

		var q = keystone.list('News').model.find(); 
		
		q.exec(function (err, results) {
			locals.data.news = results;
			next(err);
		});

	});

	// Render the view
	view.render('news');
};
