/* jQuery Plugin - Tooltip */
( function( $ ){

	$.fn.tooltip = function( content, options ){
		
		var prop = $.extend({
			type : 'default',		/* or featured */
			position : 'bottom',
			id : 'none'
		}, options );	
		
		return this.each( function(){
			$elem = $( this );
			if( prop.id === 'none' )
				var cId = generateRandomInt( 0, 1000000 );
			else
				cId = prop.id;
			$( document.body ).append( '<div class = "jQtooltip ' + prop.type + '" id = "' + cId + '">' + content + '</div>' );
			
			var hideTimer;
			
			var $tooltip = $( '#' + cId );
			var width = $tooltip.outerWidth(), height = $tooltip.outerHeight();
			
			console.log( "[Element:] W = %d, H = %d, X = %d, Y = %d; [Tooltip:] W = %d, H = %d;", $elem.outerWidth(), 
				$elem.outerHeight(), $elem.offset().top, $elem.offset().left, width, height );
			//var isHidden = $elem.is( ':hidden' );
			//if( isHidden ) 
			
			var showTooltip = function(){
				if( prop.position === 'bottom')
					$tooltip.css({
						top : ( $elem.offset().top + $elem.outerHeight() + 5 ),
						left : Math.max( $elem.offset().left - ( width - $elem.outerWidth() ) / 2, 0 )
					});
				else if( prop.position === 'left' )
					$tooltip.css({
						top : ( $elem.offset().top - ( height - $elem.outerHeight() ) / 2 ),
						left : Math.max( $elem.offset().left - width - 5, 0 )
					});
				
				$tooltip.fadeIn( 100 ).attr( 'data-can-hide', 'true' );
			}
			
			var hideTooltip = function(){
				if( $tooltip.attr( 'data-can-hide' ) === 'false' ) return;
				$tooltip.fadeOut( 100 );
			}			
			
			$tooltip.hover( function(){
				$tooltip.attr( 'data-can-hide', 'false' );
			}, function(){
				$tooltip.attr( 'data-can-hide', 'true' );
				hideTimer = window.setTimeout( hideTooltip, "100" );
			});
			
			$elem.css( 'cursor', 'pointer' ).hover( function(){
				showTooltip();
				$tooltip.attr( 'data-can-hide', 'false' );
			}, function(){
				$tooltip.attr( 'data-can-hide', 'true' );
				hideTimer = window.setTimeout( hideTooltip, "200" );
			} );
		});
		
	};

}( jQuery ));
