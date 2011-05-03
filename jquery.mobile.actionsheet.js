(function($,window,undefined){
	$.widget("mobile.actionsheet",$.mobile.widget,{
		wallpaper: undefined,
		content: undefined,
		_init: function() {
			var self = this;
			this.content= this.element.next('div')
				.addClass('ui-actionsheet-content')
				.remove()
				.appendTo($(':jqmData(role="content")'));
			//setup command buttons
			this.content.find(':jqmData(role="button")')
				.addClass('ui-actionsheet-commandbtn');
			//setup close button
			this.content.find(':jqmData(rel="close")')
				.removeClass('ui-actionsheet-commandbtn')
				.addClass('ui-actionsheet-closebtn')
				.bind('vclick', function(){
					self.close();
			});
			this.element.bind('vclick', function(){
				self.open();
			});
			if( this.element.parents( ':jqmData(role="content")' ).length != 0 ) {
				this.element.buttonMarkup();
			}
		},
		open: function() {
			this.element.unbind('vclick'); //avoid twice opening
			this.wallpaper= $('<div>', {'class':'ui-actionsheet-wallpaper'}).appendTo($('body'));
			this.wallpaper.show();
			window.setTimeout(function(self) {
				self.wallpaper.bind('vclick', function() {
					self.close();
				});
			}, 500, this);

			var height = $(document).height();
			var width = $(document).width();
			this.content.css(
					{	'top': (height /2 -100),
						'left': (width /2 -115)});
			this.content.animationComplete(function(event) {
					$(event.target).removeClass("ui-actionsheet-animateIn");
				});
			this.content.addClass("ui-actionsheet-animateIn").show();
		},
		close: function() {
			var self= this;
			if( !$.support.cssTransitions ) {
				this.content.fadeOut();
				this.wallpaper.remove();
				this.wallpaper= undefined;
				this.element.bind('vclick', function(){
					self.open();
				});
				return;
			}
			this.content.addClass("ui-actionsheet-animateOut");
			this.content.animationComplete(function(event) {
					$(event.target)
						.removeClass("ui-actionsheet-animateOut")
						.hide();
					//re-install vclick event
					self.element.bind('vclick', function(){
						self.open();
					});
				});
			self.wallpaper.remove();
			self.wallpaper= undefined; 
		}
	});	

	$( ":jqmData(role='page')" ).live( "pagecreate", function() { 
		$( ":jqmData(role='actionsheet')", this ).each(function() {
			$(this).actionsheet();
		});
	});

}) (jQuery,this)