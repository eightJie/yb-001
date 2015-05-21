define(function() {
	var mainAudio = null;

	var getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	};
	var source = getUrlParam('utm_source');
	if (source == null) {
		$('.share-wrapper').remove();
	}

	var ontap = function($el, fn) {
		var ts1, x1, y1, ts2, x2 = -1, y2 = -1;

		$el.on('touchstart', function(event) {

			ts1 = event.timeStamp;
			x1 = event.touches[0].pageX;
			y1 = event.touches[0].pageY;
			x2 = -1;
			y2 = -1;
		});
		$el.on('touchmove', function(event) {

			x2 = event.touches[0].pageX;
			y2 = event.touches[0].pageY;
		});
		$el.on('touchend',
				function(event) {

					ts2 = event.timeStamp;
					// x2=event.touches[0].pageX;
					// y2=event.touches[0].pageY;
					if (ts2 - ts1 < 1000
							&& ((x2 == -1 && y2 == -1) || (x2 - x1 < 10 && y2
									- y1 < 10))) {
						fn();
					}
				});
	};
	var WShowerRunner = {

		run : function() {
			if (window.ws_plugin) {
				if (_.isFunction(window.ws_plugin.on_start_run)) {
					window.ws_plugin.on_start_run();
				}
			}
			this.audioPlayerKeeperRunned = false;
			// WUtilOld.initStyle();
		},
		mainAudioPlayerKeeper : function() {
			if (this.audioPlayerKeeperRunned) {
				return;
			}
			if (WData.mainAudio == null) {
				return;
			}
			WData.mainAudio._handflip = true;
			WData.mainAudio.play();
			this.audioPlayerKeeperRunned = true;
		},

	};
	var WAudioCoffee = function() {
	};
	WAudioCoffee.prototype = {
		init : function($el) {
			this.audioNode = $el;
			// $('body').on('wfn_start_run', _.bind(this.onStartRun, this));
			this._audio = new Audio();
			this._isplaying = false;
			this._handflip = true;

			this.timer_txt = null;
			this.txt_controller = this.audioNode.find('#txt_controller');

			// this._canplay = false;
			// $(this._audio).on('canplay', _.bind(function() {
			// this._canplay = true;
			// if (this._isplaying) {
			// alert('play in can play');
			// $(this._audio).off('canplay');
			// _.delay(_.bind(function() {
			// this._audio.play();
			// alert('delay play');
			// }, this), 10000);
			// }
			// }, this));

			$(this._audio).on('play', _.bind(this.onAudioPlay, this));
			$(this._audio).on('pause', _.bind(this.onAudioPause, this));
			ontap(this.audioNode, _.bind(this.onBtnFlipClicked, this));
			$(this._audio).on('ended', _.bind(this.loopKeeper, this));

			// media资源的加载
			var src = this.audioNode.attr('data-ws_src');
			var options_audio = {
				// autoplay : true,
				loop : false,
				preload : "auto",
				src : src,
				"ke-src" : src
			};
			_.extend(this._audio, options_audio);

			$(this._audio).attr('data-src', src);
			$(this._audio).attr('data-ke-src', src);
			this._audio.load();

			$('#coffee_flow')
					.coffee(
							{
								steams : [
										"<img src='../../imgs/audio_widget_01@2x.png' />",
										"<img src='../../imgs/audio_widget_01@2x.png' />" ],
								steamHeight : 100,
								steamWidth : 44,
								'z-index' : 100,
							});

		},
		loopKeeper : function() {
			this._audio.currentTime = 0;
			this._audio.play();
		},
		run : function() {
			if (this._audio) {
				this.audioNode.removeClass('f_hide');
				this.play();

			}
		},
		onStartRun : function() {
			this.run();
		},
		onBtnFlipClicked : function() {
			this._handflip = true;
			this.flip();
		},
		onAudioPlay : function() {
			if (this._handflip) {
				this.audio_txt(this.txt_controller, true, this.timer_txt);

				// 开启音符冒泡
				$.fn.coffee.start();
				$('.coffee-steam-box').show(500);
				this._handflip = false;
			}
		},
		onAudioPause : function() {
			if (this._handflip) {
				this.audio_txt(this.txt_controller, false, this.timer_txt);

				// 关闭音符冒泡
				$.fn.coffee.stop();
				$('.coffee-steam-box').hide(500);
				this._handflip = false;
			}
		},

		audio_txt : function(txt, val, time_txt) {
			if (val) {
				txt.text('打开');
			} else {
				txt.text('关闭');
			}

			if (time_txt) {
				clearTimeout(time_txt);
			}

			txt.removeClass('z-move z-hide');
			time_txt = setTimeout(function() {
				txt.addClass('z-move').addClass('z-hide');
			}, 1000)
		},
		flip : function() {
			this._isplaying ? this.stop() : this.play();
		},
		play : function() {
			if (this._audio) {
				this._audio.play();
				this._isplaying = true;
			} else {
				this._isplaying = false;
			}
		},
		stop : function() {
			if (this._audio) {
				this._audio.pause();
				this._isplaying = false;
			} else {

			}
		},
	};
	
	/*$(window).on('load', function() {

		$('[data-wsm_audio]').each(function(key, value) {
			if ($(value).attr('data-ws_src') == null) {
				return;
			}
			if (mainAudio != null) {
				return;
			}
			mainAudio = new WAudioCoffee($(value));
			mainAudio.init($(value));
		});
		WShowerRunner.run();
		mainAudio.run();
	});*/

	var initAudio = function(){
		$('[data-wsm_audio]').each(function(key, value) {
			if ($(value).attr('data-ws_src') == null) {
				return;
			}
			if (mainAudio != null) {
				return;
			}
			mainAudio = new WAudioCoffee($(value));
			mainAudio.init($(value));
		});
		WShowerRunner.run();
		mainAudio.run();
	}
	return initAudio;

});
