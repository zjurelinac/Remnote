function getCurrDateString(){
	var date = new Date();
	var dayR = date.getDate() % 10;
	var suffix = dayR == 1 ? "st" : ( dayR == 2 ) ? "nd" : ( dayR == 3 ) ? "rd" : "th";
	var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	return date.getDate() + " <sup>" + suffix + "</sup> " + months[ date.getMonth() ] + ", " + twoDigitsNum( date.getHours() ) + ":" + twoDigitsNum( date.getMinutes() );
}

// not foolproof
function twoDigitsNum( x ){
	if( x % 10 == x ) return "0" + x;
	return x;
}

function generateRandomInt( a, b ){
	return Math.floor( Math.random() * ( b - a + 1 ) + a );
}
