var Letter = require("./letter");
var word = function (word){
	this.word = word;
	this.lettersInWord = [];
	this.isGuessed = false;

	this.getLettersInWord = function (){
		for(var i = 0; i < this.word.length ; i++){
			this.lettersInWord.push(new Letter(this.word[i]));
		}
	};

	this.isWordFound = function() {
		this.isGuessed = this.lettersInWord.every(function(currLett) {
			return currLett.show;
		});
		return this.isGuessed;
		
	};
	this.checkLetterInWord = function(guess){
		var returnNum = 0;
		for(var i= 0; i<this.lettersInWord.length; i++){
			if(this.lettersInWord[i].char === guess){
				this.lettersInWord[i].show = true;
				returnNum++;
			}

		}
		return returnNum;
	
	};
	this.displayWord = function(letter){
		var output = " ";
		for(var i = 0 ; i < this.lettersInWord.length ; i++){
			output += this.lettersInWord[i].displayLetter(letter);
		}
		console.log(output);
	};


}

module.exports = word;