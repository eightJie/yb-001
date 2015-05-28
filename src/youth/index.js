define(function() {
	return function() {

		$(window).on('load', function() {
			var SLIDER_NUM = $('.swiper-container .swiper-slide').length;

			var mySwiper = new Swiper('.swiper-container', {
				direction: 'vertical',
				onInit: function(s) {

					$('#loading').remove();
					showCover();
					// showSwiper();

				},
				onSlideChangeEnd: function(s) {
					showAni();

				},
				loop: true,
				loopedSlides: SLIDER_NUM
			});

			/**
			 * 显示封面
			 */
			function showCover() {
				var $cover = $('#cover');
				var $coverH = $('#cover-hour');
				var $coverM = $('#cover-minute');

				function play() {
					$coverH.addClass('animated block');
					$coverM.addClass('animated block');
					$coverM.on(getAniEndName().aniEvtName, fadeIn);

					$('#cover-hand').remove();
				}

				function fadeIn() {
					$cover.addClass('animated block fadeOut duration-2');

					$cover.on(getAniEndName().aniEvtName, function(evt) {
						if (evt.target == $cover[0]) {
							$cover.remove();
						}
					});
					setTimeout(function() {
						showSwiper();
					}, 1000);
				}

				$cover.css('visibility', 'visible');
				$cover.find('.animated').addClass('block');
				// $cover.on('swipeUp', play);
				$cover.on('touchstart', function(evt){ //侦听上滑事件
					var touchObj = evt.changedTouches[0],
						touchEndObj;
					var pageX = touchObj.pageX;
					var pageY = touchObj.pageY;
					var pageXEnd, pageYEnd;

					$cover.on('touchmove', function(evt){
						evt.preventDefault();
					});

					$cover.on('touchend', function(evt){
						touchEndObj = evt.changedTouches[evt.changedTouches.length - 1];
						pageXEnd = touchEndObj.pageX;
						pageYEnd = touchEndObj.pageY;

						if (Math.abs(pageYEnd - pageY) > 2) {
							if (pageYEnd - pageY < 0) { //上滑
								play();
							} else { //下滑
							}
						}

						$cover.off('touchmove');
						$cover.off('touchend');

					});

					evt.preventDefault();
				});
			}

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

	};
});