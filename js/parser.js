function escapeChar( x ) {
	if( x === "&" ) return "&amp;";
	if( x === '<' ) return "&lt;";
	if( x === '>' ) return "&gt;";
	if( x === "\"" ) return "&quot;";
	if( x === "\'" ) return "&#039;";
	return x;
}

function escapeString( x ){
	var escaped = "";
	for( var i = 0; i < x.length; ++i )
		escaped += escapeChar( x.charAt( i ) );
	return escaped;
}

function parseNote( x ){

	var S = new Array();
	var i = 0, stackSize;
	var parsed = "", tChar;
	x = "\n" + x + "\n";
	
	while( i < x.length ){		
		stackSize = S.length;
		tChar = escapeChar( x.charAt( i ) );		
		switch( tChar ){	/// ADD BLOCKS FOR CODE AND MATH ELEMENTS		
			case '#':{			
			
				while( S.length ) 
					parsed += S.pop();					
				parsed += "<h3>";
				S.push( "</h3>" );
				break;		
						
			} case '*':{	
					
				if( S[ stackSize - 1 ] !== "</b>" ){
					S.push( "</b>" );
					parsed += "<b>";
				} else
					parsed += S.pop();
				break;	
							
			} case '`':{	
						
				var temp = x.slice( i+1, x.indexOf( '`', i+1 ) );
				var len = temp.length;
				temp = escapeString( temp );
				parsed += "<code>" + temp + "</code>";
				i += len + 1;
				break;
			} case '[':{
			
				if( i < x.length-1 && x.charAt( i + 1 ) == '[' ){ // here we have a link
					var endPos = x.indexOf( ']]', i );
					if( endPos != -1 ) endPos += 2;
					var temp = x.slice( i, endPos );
					if( temp.indexOf( '|' ) != -1 ){						
						temp = temp.slice( 2, temp.length - 2 );
						var loc = temp.indexOf( "|" );
						var t1 = temp.slice( 0, loc ), t2 = temp.slice( loc+1 );
						parsed += "<a href = '" + ( t1.indexOf( "://" ) == -1 ? "http://" : "" ) + t1 + "'>" + t2 + "</a>";
						i += temp.length + 3;
					} else {
						temp = temp.slice( 2, temp.length - 2 );
						console.log( temp );					
						parsed += "<a href = '" + ( temp.indexOf( "://" ) == -1 ? "http://" : "" ) + temp + "'>" + temp + "</a>";							
						i += temp.length + 3;
					}
				} else 
					parsed += tChar;
								
				break;
			} case '{':{
				if( i < x.length-1 && x.charAt( i+1 ) == '{' ){
					var endPos = x.indexOf( '}}', i );
					if( endPos != -1 ) endPos += 2;
					var temp = x.slice( i, endPos );
					if( temp.indexOf( '|' ) != -1 ){						
						temp = temp.slice( 2, temp.length - 2 );
						var loc = temp.indexOf( "|" );
						var t1 = temp.slice( 0, loc ), t2 = temp.slice( loc+1 );
						parsed += "<div class = 'img-wrap'><img src = '" + t1 + "'/><div class = 'caption'>" + t2 + "</div></div>";
						i += temp.length + 3;
					} else {
						temp = temp.slice( 2, temp.length - 2 );
						console.log( temp );					
						parsed += "<div class = 'img-wrap'><img src = '" + temp + "'/></div>";							
						i += temp.length + 3;
					}
				} else 
					parsed += tChar;				
				break;
			} case '\n':{	
						
				if( i == x.length - 1 ){
					parsed += '\n';
					break;
				}					
				if( x.charAt( i+1 ) == '\n' ){					
					while( S.length )
						parsed += S.pop();				
				} else if( x.charAt( i+1 ) == ' ' ){
					if( i < x.length - 2 && x.charAt( i+2 ) == ' ' ){
						if( i < x.length - 3 && x.charAt( i+3 ) == ' ' ){ // in pre
							if( S[ stackSize-1 ] !== "</span></code></pre>" ){
								while( S.length )
									parsed += S.pop();
								parsed += "<pre><code><span class = 'line'> ";
								S.push( "</span></code></pre>" );								
							}
							var temp = x.slice( i+4, x.indexOf( '\n', i+1 ) );
							var len = temp.length;
							parsed += escapeString( temp );
							i += len + 3;
							
						} else if( i < x.length - 3 && x.charAt( i+3 ) == '-' && i < x.length - 4 && x.charAt( i+4 ) == ' ' ){
							if( S[ stackSize-1 ] !== "</ul>" ){
								while( S.length )
									parsed += S.pop();
								S.push( "</ul>" );
								parsed += "<ul>";
							} 
							
							var temp = x.slice( i+5, x.indexOf( '\n', i+1 ) );
							var len = temp.length;
							parsed += "<li>" + escapeString( temp ) + "</li>";
							i += len + 4;			
						}
					}
				} else if( S[ stackSize - 1 ] === "</h3>" ){			
					while( S.length )
						parsed += S.pop();				
				} else if( S[ stackSize - 1 ] === "</ul>" ){
					while( S.length )
						parsed += S.pop();
				}
				if( S[ S.length - 1 ] === "</span></code></pre>" ) 
					parsed += "</span><span class = 'line'>";
				parsed += '\n';
				break;
				
			} default: {	//	if ordinary character	
					
				if( stackSize == 0 ){			
					S.push( "</p>" );
					parsed += "<p>" + tChar;
				
				} else
					parsed += tChar;
				break;
				
			}
		}
		++i;
	}
	
	parsed = parsed.substring( 0, parsed.length - 1 );
	while( S.length )
		parsed += S.pop();
	return parsed;
}

function preLiner(){
	$( "pre code" ).each( function(){
		$( this ).children( "span.line" ).each( function( i ){
			$( this ).prepend( "<span class = 'ln'>" + i + "</span>" ).html( $( this ).html().replace( '\n', " " ) );
		});
	});
}
