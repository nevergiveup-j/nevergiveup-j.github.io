

!function(win){

	var SubNav = {
		init: function() {
			var that = this;

			this.$button = $('.sub-nav-title');

			if(!this.$button.length) {
				return;
			}

			this.$wrap = $('.ui-sub-nav');

			this.bind();
		},
		bind: function() {
			var that = this;

			this.$button.on('click', function() {
				that.toggle();
			});

			$('body').on('click', function(event) {
				that.listenElement(event);
			});
		},
		toggle: function() {
			var that = this;

			if(this.$wrap.hasClass('ui-sub-nav-show')){
				this.$wrap.removeClass('ui-sub-nav-show');
			}else{
				this.$wrap.addClass('ui-sub-nav-show');
			}
		},
		listenElement: function(e) {
			var target = e.target;

			while ( !$(target).hasClass('ui-sub-nav') ) {
				if (target.tagName === 'BODY') {
					break;
				} else{
					target = target.parentElement;
				}
			}

			if ('BODY' == target.tagName) {
				this.$wrap.removeClass('ui-sub-nav-show');
			}
		}
	}

	$(function(){
		SubNav.init();
	})
}(window);