/*
 * jquery.mobile.actionsheet v3
 *
 * Copyright (c) 2011, Stefan Gebhardt
 * Dual licensed under the MIT and GPL Version 2 licenses.
 * 
 * Revision: 3
 */
(function($,window){
	$.widget("mobile.actionsheet",$.mobile.widget,{
		wallpaper: undefined,
		content: undefined,
		isOpen:  false,
		_init: function() {
			var self = this;
			
			// Avoid multiple initialisation
			if(typeof this.element.data('as_initialized') !== 'undefined') {
				return;
			}
			this.element.data('as_initialized', true);
			
			this.content = ((typeof this.element.jqmData('sheet') !== 'undefined')
				? $('#' + this.element.jqmData('sheet'))
				: this.element.next('div')).addClass('ui-actionsheet-content');
			// Move content to parent page
			// Otherwise there is an error i will describe here soon
			var parentPage = this.element.parents(':jqmData(role="page")');
			this.content.remove().appendTo(parentPage);

			//setup command buttons
			this.content.find(':jqmData(role="button")').filter(':jqmData(rel!="close")')
				.addClass('ui-actionsheet-commandbtn')
				.bind('click',  $.proxy( self.close, this ));
			//setup close button
			this.content.find(':jqmData(rel="close")')
				.addClass('ui-actionsheet-closebtn')
				.bind('click', $.proxy( self.close, this ));
			this.element.bind('click', $.proxy( self.open, this ) );
			if( this.element.parents( ':jqmData(role="content")' ).length !== 0 ) {
				this.element.buttonMarkup();
			}
		},
 		open: function() {
			if ( this.isOpen ) {
				return;
			}
			this.isOpen = true;
			//this.element.unbind('click'); //avoid twice opening
			this.element.addClass('content-visible');
			var cc= this.content.parents(':jqmData(role="page")');
			this.wallpaper= $('<div>', {'class':'ui-actionsheet-wallpaper'})
				.appendTo(cc)
				.show()
				.addClass ( this.element.attr('id'));
			
			//window.setTimeout($.proxy(this._wbc, this), 500);
			this.wallpaper.bind(
				"click",
				$.proxy(function() { this.close(); },this));
			this._positionContent();

			$(window).bind('orientationchange.actionsheet',$.proxy(function () {
				this._positionContent();
			}, this));
		
			if( $.support.cssTransitions ) {
				this.content.animationComplete(function(event) {
					$(event.target).removeClass("ui-actionsheet-animateIn ui-actionsheet-opening");
				});
				this.content.addClass("ui-actionsheet-animateIn ui-actionsheet-opening").show();
			} else {
				this.content.addClass("ui-actionsheet-opening");
				this.content.fadeIn(function () {
					$(this).removeClass("ui-actionsheet-opening");
				});
			}
		},
		close: function(event) {
			$(window).unbind('orientationchange.actionsheet');
			
			if ( (typeof this.wallpaper) !== 'undefined' ) {
				this.wallpaper.unbind('click');
			};
			var self = this;
			this.content.animationComplete(function() {
				self.content
				    .removeClass("ui-actionsheet-animateOut")
				    .removeClass("ui-actionsheet-animateIn")
				    .hide();
				if ( (typeof self.wallpaper) !== 'undefined' ) {
				    self.wallpaper.remove();
				}
				self.isOpen = false; // Resetting State
			});
			this.content.addClass("ui-actionsheet-animateOut");
			this.element.removeClass('content-visible');
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

	$( ":jqmData(role='page')" ).live( "pageinit", function() { 
		$( ":jqmData(role='actionsheet')", this ).each(function() {
			$(this).actionsheet();
		});
	});

}) (jQuery,this);
