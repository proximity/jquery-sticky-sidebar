(function($) {
	var Sticky = function(element, options) {
		this.options = $.extend({}, Sticky.defaults, options);

		this.$target = $(this.options.target).on(this.options.events, $.proxy(this.checkPosition, this));
		this.$element = $(element);
		this.$container = $(this.options.container);

		this.prevScrollTop = null;

		this.checkPosition();
	};

	Sticky.defaults = {
		target: window,
		container: 'body',
		offset: 0,
		fixedTopClass: 'fixed-top',
		fixedBottomClass: 'fixed-bottom',
		events: 'scroll resize'
	};

	Sticky.prototype.getState = function(containerHeight, height, offsetTop, offsetBottom) {
		var scrollTop = this.$target.scrollTop();
		var targetHeight = this.$target.height();
		var position = this.$element.offset();
		var containerPosition = this.$container.offset();

		if (containerHeight > height) {
			if (this.prevScrollTop < scrollTop) {
				if (this.$element.hasClass(this.options.fixedTopClass)) {
					this.$element.css({
						position: 'absolute',
						top: position.top,
						bottom: 'auto',
					}).removeClass(this.options.fixedTopClass);
				}

				if (height >= targetHeight) {
					if (targetHeight + scrollTop >= height + position.top + offsetBottom) {
						this.$element.css({
							position: 'fixed',
							top: 'auto',
							bottom: offsetBottom
						}).addClass(this.options.fixedBottomClass);
					}

					if (targetHeight + scrollTop >= containerHeight + containerPosition.top + offsetBottom) {
						this.$element.css({
							position: 'absolute',
							top: containerHeight + containerPosition.top - height,
							bottom: 'auto',
						}).removeClass(this.options.fixedBottomClass);
					}
				} else {
					if (scrollTop + offsetTop >= containerPosition.top) {
						this.$element.css({
							position: 'fixed',
							top: offsetTop,
							bottom: 'auto',
						}).addClass(this.options.fixedTopClass);
					}

					if (scrollTop + offsetTop + height >= containerHeight + containerPosition.top - offsetBottom) {
						this.$element.css({
							position: 'absolute',
							top: containerHeight + containerPosition.top - offsetBottom - height,
							bottom: 'auto'
						});
					}
				}
			} else {
				if (this.$element.hasClass(this.options.fixedBottomClass)) {
					this.$element.css({
						position: 'absolute',
						top: position.top,
						bottom: 'auto',
					}).removeClass(this.options.fixedBottomClass);
				}

				if (scrollTop + offsetTop <= position.top) {
					this.$element.css({
						position: 'fixed',
						top: offsetTop,
						bottom: 'auto',
					}).addClass(this.options.fixedTopClass);

					if (scrollTop + offsetTop <= containerPosition.top) {
						this.$element.css({
							position: 'static',
							top: 'auto',
							bottom: 'auto',
						}).removeClass(this.options.fixedTopClass);
					}
				}
			}
		}

		this.prevScrollTop = scrollTop;
	};

	Sticky.prototype.checkPosition = function() {
		var height = this.$element.outerHeight();
		var containerHeight = this.$container.outerHeight();
		var offset = this.options.offset;
		var offsetTop = offset.top;
		var offsetBottom = offset.bottom;

		if (typeof offset !== 'object') offsetBottom = offsetTop = offset;
		if (typeof offsetTop === 'function') offsetTop = offset.top(this.$element);
		if (typeof offsetBottom === 'function') offsetBottom = offset.bottom(this.$element);

		this.getState(containerHeight, height, offsetTop, offsetBottom);
	};

	window.Sticky = Sticky;

	$.fn.sticky = function(options) {
		return this.each(function() {
			$(this).data('sticky', new Sticky(this, options));
		});
	};
})(jQuery);
