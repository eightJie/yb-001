$(window).on('load', function() {
	// new PreImgs().loaded(function() {

		var SLIDER_NUM = $('.swiper-container .swiper-slide').length;

		var mySwiper = new Swiper('.swiper-container', {
			direction: 'vertical',
			onInit: function(s) {

				$('#loading').remove();
				showCover();

			},
			onSlideChangeEnd: function(s) {
				showAni();

			},
			loop: true,
			loopedSlides: SLIDER_NUM
		});

	// });

	/**
	 * 显示封面
	 */
	function showCover() {
		var $cover = $('#cover');

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
		$cover.on('touchstart', fadeIn);
		$cover.find('.minute').on(getAniEndName().aniEvtName, fadeIn);
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


(function(win) {
	/**
	 * 图片预加载
	 * @param {[type]} imgs [description]
	 */
	function PreImgs() {
		this.imgs = $('[preload]');
		this.total = this.imgs.length;

		this.index = 0;
		this._load();
	}
	PreImgs.prototype = {

		_load: function() {
			var self = this;
			var imgs = self.imgs;

			imgs.each(function(i, img) {
				var $img = $(img);
				var url = $img.attr('src') || $img.css('backgroundImage');

				if (url) {
					var imgObj = new Image();

					imgObj.onload = function() {
						self.index++;


					};

				} else {
					self.total--;
				}
			});

			urls.forEach(function(url) {
				var img = new Image();

				img.onload = function() {
					self.index++;
					if (self.index == imgs.length) {
						self.loadedBack && self.loadedBack();
					}
				};
				img.src = url;

			});
		},

		loaded: function(back) {
			this.loadedBack = back;
		}

	};

	win.PreImgs = PreImgs;
})(window);