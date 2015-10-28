
$(document).ready(function(){

	// currentGame object defined by
	// number (the secret number)
	// won (true or false for current game state)
	// totalGuesses (number of guesses made so far)
	// lastGuess (the most recent guess made)
	var currentGame = startGame();

	// start a new game if new game in nav is clicked
	$(".new").click(function(){
		currentGame = startGame();		
	});

	//Check a guess
	$("#guessButton").click( function(){
		
		var guess = parseInt($('#userGuess').filter(':input').val(), 10);

		// Make sure the guess is valid
		if( (guess >= 1) && (guess <= 100) && !currentGame.won ) {

			//Check and return feedback on guess
			giveFeedback(checkGuess(guess, currentGame));
			
			//update the guess count
			currentGame.totalGuesses++;
			updateGuesses( currentGame.totalGuesses, guess);

			currentGame.lastGuess = guess;

		}
		else if ( currentGame.won ) {
			giveFeedback("You won already!");
		}
		else {
			giveFeedback("Not a valid number!");
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

	//initialize or reset variables to start
	var number = randomGameNumber(1, 100);
	var totalGuesses = 0;
	var won = false;
	var lastGuess;

	//reset game messages
	giveFeedback("Make your Guess!");
	updateGuesses(0, "");

	// Debugging messages
	// console.log("Secret number is " + number);
	// console.log("totalGuesses = " + totalGuesses);
	// console.log("won = " + won);

	return {
		number: number, 
		totalGuesses: totalGuesses,
		won: won,
		lastGuess: lastGuess
	};

};

// checks if it's the right guess or if feedback
// needs to be built
function checkGuess (guess, game) {

	var message;
	
	// winning guess case
	if( guess == game.number) {
		message = "You win!";
		game.won = true;
	}
	else {
		message = buildMessage(guess, game.number);

		if( game.lastGuess )
		{
			message = message + colderWarmer(guess, game);
		}
	}

	return message;
}

function colderWarmer(guess, game) {
	var thisDifference = Math.abs(guess - game.number);
	var lastDifference =  Math.abs(game.lastGuess - game.number);

	if( thisDifference == lastDifference) {
		return " No change.";
	}
	else if (thisDifference > lastDifference) {
		return " Getting cooler.";
	}
	else {
		return " Getting warmer.";
	}
}

// Constructs the message based on difference between
// the guess and the secret number
function buildMessage (x, y) {
	
	var message;
	var difference = Math.abs(x - y);

	if( difference > 50 ) {
			message = "Ice cold."
	}
	else if( difference > 30 ) {
			message = "Cold."
	}
	else if( difference > 20 ) {
		message = "Warm."
	}
	else if( difference > 10 ) {
		message = "Hot."
	}
	else {
		message = "Very hot."
	}

	return message;

};

// Controls feedback
function giveFeedback(message) {
	$('#feedback').text(message);
};

// function both handles updating guess counter and list
// and resetting those when a new game is started
function updateGuesses(guesses, guess) {
	$('#count').text(guesses);

	// A guess has been made. Add it to list
	if (guess) {
		$('#guessList').append("<li>" + guess + "</li>");
	}

	// No guesses made. Make sure list is empty.
	if( guesses == 0 ) {
		$('#guessList').empty();
	}
}