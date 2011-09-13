/*
 * jquery.mobile.actionsheet v1
 *
 * Copyright (c) 2011, Stefan Gebhardt and Tobias Seelinger
 * Dual licensed under the MIT and GPL Version 2 licenses.
 * 
 * Date: 2011-05-03 17:11:00 (Tue, 3 May 2011)
 * Revision: 1.1
 */
(function($,window){
	$.widget("mobile.actionsheet",$.mobile.widget,{
		wallpaper: undefined,
		content: undefined,
		hidden: false,
		_init: function() {
			var self = this;
			var hid = this.element.attr('data-sheethidden');
			if (typeof(hid) != 'undefined' && hid.toLowerCase() == 'true') {
				this.hidden = true;
			}
			this.content = ((typeof this.element.jqmData('sheet') !== 'undefined')
				? $('#' + this.element.jqmData('sheet'))
				: this.element.next('div'))
				.addClass('ui-actionsheet-content');
			if( this.content.parents( ':jqmData(role="content")' ).length === 0 ) {
				// sheet-content is not part of the page-content,
				// maybe it's part of the page-header: move it to page-content!
				var currentContent = 
					this.content.parents(':jqmData(role="page")').children(':jqmData(role="content")');
				this.content.remove().appendTo(currentContent);
			}
			//setup command buttons
			this.content.find(':jqmData(role="button")').filter(':jqmData(rel!="close")')
				.addClass('ui-actionsheet-commandbtn')
				.bind('tap', function(){
					self.reset();
				});
			//setup close button
			this.content.find(':jqmData(rel="close")')
				.addClass('ui-actionsheet-closebtn')
				.bind('tap', function(){
					self.close();
				});
			this.element.bind('tap', function(){
				self.open();
			});
			if( this.element.parents( ':jqmData(role="content")' ).length !== 0 ) {
				this.element.buttonMarkup();
				if (this.hidden) {
					this.element.hide();
				} else {
					this.element.buttonMarkup();
				}
			}
			}
		},
		open: function() {
			this.element.unbind('tap'); //avoid twice opening
			
			var cc= this.content.parents(':jqmData(role="content")');
			this.wallpaper= $('<div>', {'class':'ui-actionsheet-wallpaper'})
				.appendTo(cc)
				.show();
 
			window.setTimeout(function(self) {
				self.wallpaper.bind('tap', function() {
					self.close();
				});
			}, 500, this);

			this._positionContent();

			$(window).bind('orientationchange.actionsheet',$.proxy(function () {
				this._positionContent();
			}, this));
			
			this.content.animationComplete(function(event) {
					$(event.target).removeClass("ui-actionsheet-animateIn");
				});
			this.content.addClass("ui-actionsheet-animateIn").show();
		},
		close: function() {
			var self = this;
			this.wallpaper.unbind('tap');
			$(window).unbind('orientationchange.actionsheet');
			if( $.support.cssTransitions ) {
				this.content.addClass("ui-actionsheet-animateOut");
				this.wallpaper.remove();
				this.content.animationComplete(function() {
					self.reset();
				});
			} else {
				this.wallpaper.remove();
				this.content.fadeOut();
				this.element.bind('tap', function(){
					self.open();
				});
			}
		},
		reset: function() {
			this.wallpaper.remove();
			this.content
				.removeClass("ui-actionsheet-animateOut")
				.removeClass("ui-actionsheet-animateIn")
				.hide();
			var self= this;
			this.element.bind('tap', function(){
				self.open();
			});
		},
		_positionContent: function() {
			var height = $(window).height(),
				width = $(window).width(),
				scrollPosition = $(window).scrollTop();
			this.content.css({
				'top': (scrollPosition + height / 2 - this.content.height() / 2),
				'left': (width / 2 - this.content.width() / 2)
			});
		}
	});

	$( ":jqmData(role='page')" ).live( "pagecreate", function() { 
		$( ":jqmData(role='actionsheet')", this ).each(function() {
			$(this).actionsheet();
		});
	});

}) (jQuery,this);
