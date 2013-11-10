/* jQuery Plugin - Tooltip */
( function( $ ){

	$.fn.tooltip = function( content, options ){
		
		var prop = $.extend({
			type : 'default'		/* or featured */
		}, options );	
		
		return this.each( function(){
			$elem = $( this );
			var cId = generateRandomInt( 0, 1000000 );
			$( document.body ).append( '<div class = "jQtooltip + ' + prop.type + '" + id = "' + cId + '">' + content + '</div>' );
			
			var $tooltip = $( '#' + cId );
			var width = $tooltip.width(), height = $tooltip.height();
			
			/*console.log( "[Element:] W = %d, H = %d, X = %d, Y = %d; [Tooltip:] W = %d, H = %d;", $elem.width(), 
				$elem.height(), $elem.offset().top, $elem.offset().left, width, height );*/
			$tooltip.css({
				top : ( $elem.offset().top + $elem.height() + 5 ),
				left : ( $elem.offset().left + ( width - $elem.width() ) / 2 )
			});
			
			$elem.css( 'cursor', 'pointer' ).hover( function(){
				$tooltip.show();
			}, function(){
				$tooltip.hide();
			} );
		});
		
	};

}( jQuery ));
