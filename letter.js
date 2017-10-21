var letter = function(char){
	this.char = char;
	this.show = false;
	this.displayLetter= function(char){
		return ( !(this.show) ? "_ " : this.char);
	}

};

module.exports= letter;