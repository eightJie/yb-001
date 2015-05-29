$(window).on('load', function() {
	// new PreImgs().loaded(function() {

	var SLIDER_NUM = $('#swiper-container .swiper-slide').length;

	var mySwiper = new Swiper('#swiper-container', {
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
		$('#swiper-container').css('visibility', 'visible');
		showAni();
	}

	/**
	 * 播放每个slide里的动画
	 */
	function showAni() {
		var $active = $('.swiper-slide-active');

		$active.find('.animated').addClass('block');
		$('.swiper-slide-prev, .swiper-slide-next').find('.animated').removeClass('block');

		sixHandler($active);
	}

	/**
	 * 第六页处理
	 * @return {[type]} [description]
	 */
	function sixHandler($active) {
		if ($active.hasClass('swiper-6')) { //第六页时

			//涂抹事件监听
			$active.on('touchstart', function() {
				showPhotos($active);
			});

			//初始化swiper
			var mySwiper = new Swiper('.swiper-container-2', {});

		} else {
			sixClear($active);
		}
	}

	//重置第六页页面状态
	function sixClear($active) {
		$active.removeClass('state-list').removeClass('state-view');
		$active.off('touchstart');
		$active.find('.img-wrap').off('touchstart');
	}

	/**
	 * 第六页，切换至图片列表
	 */
	function showPhotos($active) {
		$active.off('touchstart');
		$active.addClass('state-list');

		//显示左右滑动浏览图片swiper
		$active.find('.img-wrap').on('touchstart', function(evt) {
			$active.addClass('state-view');
		});
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