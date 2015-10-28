
$(document).ready(function(){
	
	var newGame = startGame();

	$(".new").click(function(){
		var newGame = startGame();		
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

function randomGameNumber (minimum, maximum) {

	randomNumber = Math.floor( Math.random() * (maximum - minimum + 1)) + minimum; 
	return randomNumber;

};

function startGame () {

	var number = randomGameNumber(1, 100);
	var guesses = 0;

	return {
		number: number, 
		guesses: guesses
	};

};