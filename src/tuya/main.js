require.config({
	baseUrl: '../../',
	paths: {
		zepto: 'lib/eraser/zepto.min',
		underscore: 'lib/underscore/underscore-min',
		eraser: 'lib/eraser/jquery.eraser',
		coffee: 'lib/coffee/coffee',
		swiper: 'lib/swiper/js/swiper.min',
		shower: 'common/shower',
		index: 'src/tuya/index'
	}
});

require(['zepto', 'underscore', 'eraser', 'coffee', 'swiper', 'shower', 'index'], function(zepto, underscore, eraser, coffee, swiper, shower, index) {
	index();
	shower();
});