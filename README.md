# jQuery Sticky Sidebar

## Description
jQuery Sticky Sidebar is a sidebar system developed to work with long
and/or infinte scrolling pages. 
Unlike affix, Sticky Sidebar takes into consideration the length of the
fixed container. [Checkout the
demo](http://proximity.github.io/jquery-sticky-sidebar/)

## Usage
<pre>
	$('#sidebar').sticky({
		container: '#main',
		offset: 0, // { top: 20, bottom: 40 }
	});
</pre>

### Default options
<pre>
	Sticky.defaults = {
		target: window,
		container: 'body',
		offset: 0,
		fixedTopClass: 'fixed-top',
		fixedBottomClass: 'fixed-bottom',
		events: 'scroll resize'
	};
</pre>




