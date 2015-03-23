var $window = $(window);
var $document = $(document);
var $sidebar = $('#uv-sidebar');
var $results = $('#uv-results').css('min-height', $sidebar.outerHeight() * 1.5);
var prevScrollTop = 0;
var initSidebarTopOffset = $sidebar.offset().top;
var initSidebarTopPosition = $sidebar.position().top;

$window.on('scroll', function () {
	var windowHeight = $window.height();
	var documentHeight = $document.height();
	var offsetTop = initSidebarTopOffset;
	var offsetBottom = $document.height() - $results.outerHeight(true) - $results.offset().top;
	var scrollTop = $window.scrollTop();
	var scrollBottom = $window.outerHeight() + scrollTop;
	var topOffset = 20;
	var bottomOffset = 20;
	var scrollingDown = prevScrollTop < scrollTop;
	var sidebarHeight = $sidebar.outerHeight();
	var sidebarTopOffset = $sidebar.offset().top;

	prevScrollTop = scrollTop;

	if (scrollingDown) {
		var reachedBottom = documentHeight - scrollBottom <= offsetBottom;

		// is the sidebar fixed to the top
		if ($sidebar.hasClass('fixed-top')) {
			$sidebar.css({
				position: 'absolute',
				top: sidebarTopOffset - (initSidebarTopOffset - initSidebarTopPosition),
				bottom: 'auto',
			}).removeClass('fixed-top');
		}

		/*console.log('scrollBottom', scrollBottom);
		console.log('sidebarHeight', sidebarHeight);
		console.log('sidebarTopOffset', sidebarTopOffset);
		console.log('bottomOffset', bottomOffset);
		console.log(sidebarHeight + sidebarTopOffset + bottomOffset);
		console.log(scrollBottom >= sidebarHeight + sidebarTopOffset + bottomOffset);*/

		if (sidebarHeight > windowHeight) {
			// have we reached the bottom of the sidebar
			if (scrollBottom >= sidebarHeight + sidebarTopOffset + bottomOffset) {
				// have we reached the bottom of the container
				if (reachedBottom) {
					$sidebar.css({
						position: 'absolute',
						top: initSidebarTopPosition + $results.outerHeight() - $sidebar.outerHeight(),
						bottom: 'auto',
					});
				} else {
					// pin sidebar to the bottom of the window
					$sidebar.css({
						position: 'fixed',
						top: 'auto',
						bottom: bottomOffset,
					}).addClass('fixed-bottom');
				}
			}
		} else {
			if (scrollTop + topOffset >= initSidebarTopOffset && !reachedBottom) {
				$sidebar.css({
					position: 'fixed',
					top: topOffset,
					bottom: 'auto',
				}).addClass('fixed-top');
			}
		}

		// unpin from footer
	} else {
		/*console.log('scrollTop', scrollTop);
		console.log('sidebarHeight', sidebarHeight);
		console.log('sidebarTopOffset', sidebarTopOffset);
		console.log('topOffset', topOffset);
		console.log(scrollTop + topOffset < sidebarTopOffset);
		console.log(scrollTop <= initSidebarTopOffset);*/

		if ($sidebar.hasClass('fixed-bottom')) {
			$sidebar.css({
				position: 'absolute',
				top: sidebarTopOffset - (initSidebarTopOffset - initSidebarTopPosition),
				bottom: 'auto',
			}).removeClass('fixed-bottom');
		}

		// have we reached the top of the sidebar
		if (scrollTop + topOffset <= sidebarTopOffset) {
			// have we reached the top of the container
			if (scrollTop + topOffset <= initSidebarTopOffset) {
				$sidebar.css({
					position: 'static',
					top: 'auto',
					bottom: 'auto',
				});
			} else {
				$sidebar.css({
					position: 'fixed',
					top: topOffset,
					bottom: 'auto',
				}).addClass('fixed-top');
			}
		}
	}
});
