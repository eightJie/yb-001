define(function() {
	return function() {
		$(window).on('load', function() {
			
			var SLIDER_NUM = $('#swiper-container .swiper-slide').length;

			var mySwiper = new Swiper('#swiper-container', {
				onInit: function(s) {

					$('#loading').remove();
					showSwiper();

				},
				onSlideChangeEnd: function(s) {
					showAni();

				},
				// loop: true,
				// loopedSlides: SLIDER_NUM
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
			}

		});
	};
});