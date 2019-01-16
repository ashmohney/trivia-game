/* 
User sees start button
User clicks start button
    start button hides
    question appears
    multiple answers appear
    timer begins counting down 30 sec
User clicks correct answer
    "correct" appears
    screen waits 2-3 secs
    new Q&A pops up
Use clicks incorrect answer
    "incorrect" appears
    screen waits 2-3 secs
    new Q&A pops up
User finishes answering all 10 Qs
    stas pop up 
    restart button appears
User clicks "Play Again?"
    restart button hides 
    question appear
    
Etc.....

*/

$( document ).ready(function() {
    console.log( "Trivia Time!" );


//Setting Quesitons and Answer:

var options = [
	{
		question: "Which American-owned brewery led the country in sales by volume in 2015?", 
		choice: ["Anheuser Busch", "Boston Beer Company", "Miller Coors", "Yuengling's"],
		answer: 3,
		photo: "assets/images/yuengling.gif"
	 },
	 {
	 	question: "According to Sherlock Holmes, &quot;If you eliminate the impossible, whatever remains, however improbable, must be the...&quot;", 
		choice: ["Truth", "Answer", "Cause", "Source"],
		answer: 0,
		photo: "assets/images/sherlock.gif"
	 }, 
	 {
	 	question: "On a dartboard, what number is directly opposite No. 1?", 
		choice: ["20", "12", "19", "15"],
		answer: 2,
		photo: "assets/images/dartboard.gif"
	}, 
	{
		question: "Which sign of the zodiac is represented by the Crab?", 
		choice: ["Cancer", "Libra", "Virgo", "Sagittarius"],
		answer: 0,
		photo: "assets/images/crab.gif"
	}, 
	{
		question: "How many colors are there in a rainbow?", 
		choice: ["8", "10", "9", "7" ],
		answer: 3,
		photo: "assets/images/rainbow.gif"
	}, 
	{
		question: "What is the nickname of the US state of California?", 
		choice: ["Sunshine State", "Golden State", "Bay State", "Treasure State"],
		answer: 1,
		photo: "assets/images/caFlag.gif"
	}, 
	{
		question: "What alcoholic drink is made from molasses?", 
		choice: ["Gin", "Rum", "Whisky", "Vodka" ],
		answer: 1,
		photo: "assets/images/rum.gif"
	}, 
	{
		question: "What machine element is located in the center of fidget spinners?", 
		choice: ["Axles", "Gears", "Bearings", "Belts" ],
		answer: 2,
		photo: "assets/images/spinner.gif"
	}];


//Setting variables

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 15;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];

//Setting jQuery

var beGin = $("#start");
var tryAgain = $("#reset");
var userAnswer = $("#answer-box");





tryAgain.hide();        //hides reset button

beGin.on("click", function () {       //click Start button to begin game
		beGin.hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})

function runTimer(){                                //timer start
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}

function decrement() {                              //timer countdown
	$("#timer-box").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	
	if (timer === 0) {                              //if timer at 0
		unanswerCount++;
		stop();
		userAnswer.html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}


function stop() {                                   //timer stop
	running = false;
	clearInterval(intervalId);
}


function displayQuestion() {                            //display Q to answer from array
	
	index = Math.floor(Math.random()*options.length);    //generate random index in array
	pick = options[index];

		
    $("#question-box").html("<h2>" + pick.question + "</h2>");
        
		for(var i = 0; i < pick.choice.length; i++) {           //loop through answer array and display
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");                    //adding and reporting user choice
			userChoice.html(pick.choice[i]);
			userChoice.attr("data-guessvalue", i);
		    userAnswer.append(userChoice);

}




$(".answerchoice").on("click", function () {                    //user picks answer

	userGuess = parseInt($(this).attr("data-guessvalue"));      //grabs guess value

	
	if (userGuess === pick.answer) {                            //correct choice
		stop();
		correctCount++;
		userGuess="";
		userAnswer.html("<p>Correct!</p>");
		hidepicture();

	} else {                                                    //incorrect choice
		stop();
		wrongCount++;
		userGuess="";
		userAnswer.html("<p>Nope! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {                                       //actions in between Qs
	userAnswer.append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		userAnswer.empty();
		timer= 15;


	if ((wrongCount + correctCount + unanswerCount) === qCount) {  //end game stats
		$("#question-box").empty();
		$("#question-box").html("<h3>Game Over!  Here's how you did: </h3>");
		userAnswer.append("<h4> Correct: " + correctCount + "</h4>" );
		userAnswer.append("<h4> Incorrect: " + wrongCount + "</h4>" );
		userAnswer.append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		tryAgain.show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

tryAgain.on("click", function() {                               //showing play again? button
	tryAgain.hide();
	userAnswer.empty();
	$("#question-box").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})


//END

});