(function($,window,undefined){
	$.widget("mobile.actionsheet",$.mobile.widget,{
		wallpaper: undefined,
		content: undefined,
		_init: function() {
			var self = this;
			this.content= this.element.next('div').addClass('ui-actionsheet-content');
			if( this.content.parents( ':jqmData(role="content")' ).length == 0 ) {
				// sheet-content is not part of the page-content,
				// maybe it's part of the page-header: move it to page-content!
				var currentPage = this.content.parents(':jqmData(role="page")');
				var currentContent = currentPage.children(':jqmData(role="content")');
				this.content.remove().appendTo(currentContent);
			}
			//setup command buttons
			this.content.find(':jqmData(role="button")').filter(':jqmData(rel!="close")')
				.addClass('ui-actionsheet-commandbtn')
				.bind('click', function(event){
					self.reset();
				});
			//setup close button
			this.content.find(':jqmData(rel="close")')
				.addClass('ui-actionsheet-closebtn')
				.bind('click', function(event){
					self.close();
				});
			this.element.bind('click', function(){
				self.open();
			});
			if( this.element.parents( ':jqmData(role="content")' ).length != 0 ) {
				this.element.buttonMarkup();
			}
		},
		open: function() {
			this.element.unbind('click'); //avoid twice opening
			this.wallpaper= $('<div>', {'class':'ui-actionsheet-wallpaper'}).appendTo($('body'));
			this.wallpaper.show();
			window.setTimeout(function(self) {
				self.wallpaper.bind('click', function(event) {
					self.close();
				});
			}, 500, this);

			var height = $(window).height();
			var width = $(window).width();
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
			this.wallpaper.unbind('click');
			if( !$.support.cssTransitions ) {
				this.wallpaper.remove();
				this.content.fadeOut();
				this.element.bind('click', function(){
					self.open();
				});
				return;
			}
			this.content.addClass("ui-actionsheet-animateOut");
			this.wallpaper.remove();
			this.content.animationComplete(function(event) {
					self.reset();
				});
		},
		reset: function() {
			this.wallpaper.remove();
			this.content
				.removeClass("ui-actionsheet-animateOut")
				.removeClass("ui-actionsheet-animateIn")
				.hide();
			var self= this;
			this.element.bind('click', function(){
				self.open();
			});
		}
	});	

	$( ":jqmData(role='page')" ).live( "pagecreate", function() { 
		$( ":jqmData(role='actionsheet')", this ).each(function() {
			$(this).actionsheet();
		});
	});

}) (jQuery,this)
