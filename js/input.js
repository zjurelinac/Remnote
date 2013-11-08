function noteInputer(){
	$( "#input-note-content" ).elastic().keypress( function( e ){
		var $this = $( this );
				
		if( e.keyCode == 9 ){	// tab, prevent focus change
		
			e.preventDefault();
			$this.val( $this.val() + "\t" );
			
		} else if( e.keyCode == 13 ){	// enter, check for code and lists
			
			
			
		}
		
	});
}
