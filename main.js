var Word = require("./words.js");
var inquirer = require("inquirer");
var fs = require("fs");

console.log("Welcome to the world of random guesses.");
console.log("Good Luck!!!");
console.log("*************************************");

fs.readFile("wordlist.txt","utf-8", function(error,data){
	if(error){
		console.log("Oops!! Something went wrong while loading the words list.")
	}
	var wordlist= data.split("\r\n");
	var wordToGuess = wordlist[Math.floor(Math.random()*wordlist.length)];
	wordToGuess = new Word(wordToGuess);
	

	var remainingGuesses = 10;

	var startGame = function(word){
		remainingGuesses = 10;
		wordToGuess.getLettersInWord();
		promptUser();
	}
	
	var resetGame = function(){
		var wordToGuess = wordlist[Math.floor(Math.random()*wordlist.length)];
		wordToGuess = new Word(wordToGuess);
		startGame();
	}
	var playAgain = function(){
		inquirer.prompt([
			{
				message : "Do you wish to play again or exit",
				name: "playAgainChoice",
				choices : ["Play Again", "Exit"],
				type : "list"
			}
		]).then(function(answers){
			if(answers.playAgainChoice==="Play Again"){
				resetGame();
			}else{
				return;
			}
		})
	}

	var promptUser = function(){
		var guessedwords = [];
		wordToGuess.displayWord();
		inquirer.prompt([
			{
				type : "input",
				message : "\nPlease enter your guess. ",
				name : "guess",
				validate : function (guess){
					if(/^[a-z]+$/.test(guess)&& guess.length===1&&guessedwords.indexOf(guess)===-1 ){
						return true;
					}	
					return "Please enter an input as a single lower case alphabet only!"
				}
			}
		]).then(function (answers) {
			
			guessedwords.push(answers.guess);

			console.log("You guessed: " + answers.guess);
 			var lettersGuessed = wordToGuess.checkLetterInWord(answers.guess);

 			if(lettersGuessed === 0) {
 				console.log("WRONG GUESS");
 				remainingGuesses--;
 				wordToGuess.displayWord(answers.guess);
 			} else {
 				console.log("CORRECT GUESS");
 					if(wordToGuess.isWordFound()){
 						wordToGuess.displayWord(answers.guess);
 						console.log("You won!");
 						console.log("__________________________________");
 						playAgain();
 					}
 			}

 			console.log("Guesses remaining: " + remainingGuesses);
 			console.log("__________________________________");
 			if((remainingGuesses > 0) && (wordToGuess.isGuessed == false)){
 				promptUser();
 			}
 			else if(remainingGuesses ==0){
 				console.log("Game over. Correct Word ", wordToGuess.word);
 				playAgain();
 			} else {
 				console.log(wordToGuess.displayWord(answers.guess));
 			}
 		});
 	
}

startGame();
})

