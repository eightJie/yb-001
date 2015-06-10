require.config({
	baseUrl: '../../',
	paths: {
		zepto: 'lib/zepto/zepto.min',
		underscore: 'lib/underscore/underscore-min',
		coffee: 'lib/coffee/coffee',
		swiper: 'lib/swiper/js/swiper.min',
		shower: 'common/shower',
		index: 'src/gf/index'
	}
});

require(['zepto', 'underscore', 'coffee', 'swiper', 'shower', 'index'], function(zepto, underscore, coffee, swiper, shower, index) {
	index();
	shower();
});