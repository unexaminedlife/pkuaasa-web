var keystone = require('keystone');
var Types = keystone.Field.Types;
var News = new keystone.List('News', {
	autokey: { from: 'headline', path: 'slug', unique: true },
});

News.add({
	headline: { type: String, initial: true, default: '', required: true },
        state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
        publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	content: { type: Types.Textarea },
	createdBy: { type: Types.Relationship, ref: 'User', index: true, many: false },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	});

News.defaultSort = '-createdAt';

News.defaultColumns = 'headline|30%, createdBy, createdAt, updated, state';

News.schema.virtual('url').get(function() {
	return '/news/'+this.slug;
});
News.register();
