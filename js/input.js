function noteInputer(){

	$( "#input-note-content" ).elastic().keypress( function( e ){
	
		var $this = $( this );
				
		if( e.keyCode == 9 ){	// tab, prevent focus change
		
			e.preventDefault();
			//console.log( $this.caret() );
			$this.caret( '    ' );		/// Enable different tab sizes; TS = 4
			
		} else if( e.keyCode == 13 ){	// enter, check for code and lists
			// if indented, continue indentation
			e.preventDefault();
			var ts =  $this.val().slice( 0, $this.caret() );
			
			ts = ts.slice( ts.lastIndexOf( '\n' )+1 );
			//console.log( ts );
						
			var ma = ts.match( /^[\ \t]* /g );
			//console.log( ma );
			if( ma != undefined && ma != null )
				$this.caret( '\n' + ma[ 0 ] );
			else 
				$this.caret( '\n' );
		}
		
	});
}

function toolbarActions(){
	$toolbar = $( '#input-content-toolbar' );
	$content = $( '#input-note-content' );
	$toolbar.find( '#insert-header' ).click( function(){
		var rng = $content.range();
		console.log( rng );
		$content.caret( "\n\n#" ).caret( rng.end + 3 ).caret( '\n\n' ).caret( rng.end + 3 );
	});
	
	$toolbar.find( '#insert-bold' ).click( function(){
		var rng = $content.range();
		$content.caret( '*' ).caret( rng.end+1 ).caret( '*' ).caret( rng.end+1 );
	});
	
	$toolbar.find( '#insert-link' ).click( function(){
	
	});
	
	$toolbar.find( '#insert-image' ).click( function(){
	
	});
	
	$toolbar.find( '#insert-code' ).click( function(){
	
	});
	
	$toolbar.find( '#insert-math' ).click( function(){
	
	});
	
	$toolbar.find( '#show-info' ).tooltip( 'Tip tip tip<br/ >Hip hip hip', { type : 'special', position : 'left' } )
	.click( function(){
	
	});
}
