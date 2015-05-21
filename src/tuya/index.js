$(window).on('load', function() {
	// new PreImgs().loaded(function() {

		var SLIDER_NUM = $('.swiper-container .swiper-slide').length;

		var mySwiper = new Swiper('.swiper-container', {
			direction: 'vertical',
			onInit: function(s) {

				$('#loading').remove();
				showSwiper();

			},
			onSlideChangeEnd: function(s) {
				showAni();

			},
			loop: true,
			loopedSlides: SLIDER_NUM
		});

	// });

	/**
	 * 显示swiper
	 */
	function showSwiper() {
		$('.swiper-container').css('visibility', 'visible');
		showAni();
	}

	/**
	 * 播放每个slide里的动画
	 */
	function showAni() {
		$('.swiper-slide-active').find('.animated').addClass('block');
		$('.swiper-slide-prev, .swiper-slide-next').find('.animated').removeClass('block');
	}

	/**
	 * 获取动画结束事件的名字
	 */
	function getAniEndName() {
		var transElement = document.createElement('trans');
		var transitionEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'transition': 'transitionend'
		};
		var animationEndEventNames = {
			'WebkitTransition': 'webkitAnimationEnd',
			'MozTransition': 'animationend',
			'OTransition': 'oAnimationEnd',
			'transition': 'animationend'
		};

		function findEndEventName(endEventNames) {
			for (var name in endEventNames) {
				if (transElement.style[name] !== undefined) {
					return endEventNames[name];
				}
			}
		}
		return {
			transEvtName: findEndEventName(transitionEndEventNames),
			aniEvtName: findEndEventName(animationEndEventNames)
		};
	}
});