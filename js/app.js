
$(document).ready(function(){

	// start a new game with a number and guesses	
	var currentGame = startGame();

	console.log("Page reloaded");
	console.log("Secret number is " + currentGame.number);

	// start a new game if new game in nav is clicked
	$(".new").click(function(){
		var currentGame = startGame();		
	});

	//Check a guess
	$("#guessButton").click( function(){
		
		var guess = $('#userGuess').filter(':input').val();

		// Make sure the guess is valid
		if( parseInt(guess, 10) && !currentGame.won ) {

			giveFeedback(checkGuess(guess, currentGame));
		}
		else if ( currentGame.won ) {
			giveFeedback("You won already!");
		}
		
	});

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});

// generates a random number
function randomGameNumber (minimum, maximum) {

	randomNumber = Math.floor( Math.random() * (maximum - minimum + 1)) + minimum; 
	return randomNumber;

};

// function creates a new game by returning an object
function startGame () {

	var number = randomGameNumber(1, 100);
	var totalGuesses = 0;
	var won = false;
	var lastGuess;
	clearFeedback();

	return {
		number: number, 
		totalGuesses: totalGuesses,
		won: won.
		lastGuess: lastGuess
	};

};

// this function checks which is the larger number
// and then submits to buildMessage for the actual check
function checkGuess (guess, game) {

	var message;
	
	// winning guess case
	if( guess == game.number) {
		message = "You win!";
		game.won = true;
	}
	else if ( guess > game.number) {
		message = buildMessage( guess, game.number);
	}
	else {
		message = buildMessage( game.number, guess);
	}

	return message;
}

// Constructs the message based on difference between
// the guess and the secret number
function buildMessage (largerNumber, smallerNumber) {
	
	var message;

	if( (largerNumber - smallerNumber) > 50 ) {
			message = "Ice cold."
	}
	else if( (largerNumber - smallerNumber) > 30 ) {
			message = "Cold."
	}
	else if( (largerNumber - smallerNumber) > 20 ) {
		message = "Warm."
	}
	else if( (largerNumber - smallerNumber) > 10 ) {
		message = "Hot."
	}
	else {
		message = "Very hot."
	}

	return message;

};

function giveFeedback(message) {
	$('#feedback').text(message);
};

function clearFeedback() {
	$('#feedback').text("Makes your Guess!");
}