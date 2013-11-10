/* jQuery Plugin - Tooltip */
( function( $ ){

	$.fn.tooltip = function( content, options ){
		
		var prop = $.extend({
			type : 'default'		/* or featured */
		}, options );	
		
		return this.each( function(){
			var cId = generateRandomInt( 0, 1000000 );
			this.append( '<div class = "jQtooltip + ' + prop.type + '" + id = "' + cId + '">' + content + '</div' );
			var $tooltip = this.children( '#' + cId );
			this.hover( function(){
				$tooltip.fadeIn();
			}, function(){
				$tooltip.fadeOut();
			} );
		});
		
	};

}( jQuery ));
