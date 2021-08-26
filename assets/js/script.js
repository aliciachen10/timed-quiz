var startButton = document.querySelector(".start-button");

var rightCounter = 0;
var wrongCounter = 0;
var timer;
//var timerCount;

var highScores;

var question = document.querySelector(".question");
var answers = document.querySelector(".answers");

//array of questions the user will answer
var questions =[{question: "Commonly used data types DO NOT include:", 
    choices: ["strings", "booleans", "alerts", "numbers"], 
    correctAnswer: "alerts"},

    {question: "The condition in an if/else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses"},

    {question: "Arrays in JavaScript can be used to store",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: "all of the above"},

    {question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: "console.log"}]

//the init function is called when the page loads
function init() {
    
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

//the startgame function is called when the start button is clicked
function startGame() {
    timerCount = 40;
    //prevents start button from being clicked when round is in progress 
    startButton.disabled = true; 

    //TODO: INSERT OTHER FUNCTIONS THAT BELONG HERE 
    // startTimer()
    // TO DO: GET RID OF START BUTTON 
    answers.textContent = "";

    question.textContent = questions[0]['question'];
    //CREATE FOUR ANSWER BUTTONS ONE FOR EACH POSSIBLE ANSWER IN THE ARRAY 

    var answerButtonArray = [];

    for (var i = 0; i < questions[0]['choices'].length; i++){
      answerButtonArray[i] = document.createElement('button');
      answerButtonArray[i].innerHTML = questions[0]['choices'][i];
      answers.appendChild(answerButtonArray[i]);

      linebreak = document.createElement("br");
      answers.appendChild(linebreak);
    }

    //add event listener for answer button 
    for (var i = 0; i < questions[0]['choices'].length; i++){
      answerButtonArray[i].addEventListener("click", answerSelect());
    };

};




function answerSelect() {
  question.textContent = questions[1]['question'];
  //CREATE FOUR ANSWER BUTTONS ONE FOR EACH POSSIBLE ANSWER IN THE ARRAY 

  var answerButtonArray = [];

  for (var i = 0; i < questions[1]['choices'].length; i++){
    answerButtonArray[i] = document.createElement('button');
    answerButtonArray[i].innerHTML = questions[1]['choices'][i];
    answers.appendChild(answerButtonArray[i]);

    linebreak = document.createElement("br");
    answers.appendChild(linebreak);
  }
};

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          winGame();
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
  }

