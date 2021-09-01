var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var correctStatus = document.querySelector(".correct-status");
var rightCounter = 0;
var wrongCounter = 0;
var timer;

var highScores;

var question = document.querySelector(".question");
var answers = document.querySelector(".answers");

var answerButtonArray = [];
var questionNumber = 0;

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
    startButton.remove();

    //TODO: INSERT OTHER FUNCTIONS THAT BELONG HERE 
    startTimer()
    newQuestion()
};

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
// TO DO: make timer responsive to whether the person has finished the game or not.
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;

    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      finalScoreScreen()
    }
  }, 1000);
}

function newQuestion() {

  question.textContent = questions[questionNumber]['question'];
  answers.innerHTML =""; //or answers.textContent ="";

  //NEED TO INDICATE WHETHER THE QUESTION WAS CORRECT OR INCORRECT AND INCREMENT THE QUESTION; 

  //CREATE FOUR ANSWER BUTTONS ONE FOR EACH POSSIBLE ANSWER IN THE ARRAY 

  for (var i = 0; i < questions[questionNumber]['choices'].length; i++){
    answerButtonArray[i] = document.createElement('button');
    answerButtonArray[i].innerHTML = questions[questionNumber]['choices'][i];
    answerButtonArray[i].addEventListener("click", questionCorrect);
    answers.appendChild(answerButtonArray[i]);

    linebreak = document.createElement("br");
    answers.appendChild(linebreak);
  }
  
};

function questionCorrect(event) {
  // console.log("WHAT WAS CLICKED >>>", event.currentTarget.innerHTML);
  // console.log("CORRECT ANSWER >>>", questions[questionNumber]['correctAnswer']);
  if(event.currentTarget.innerHTML === questions[questionNumber]['correctAnswer']){
    correctStatus.innerHTML = 'Correct';

    setTimeout(function(){
        correctStatus.innerHTML = '';
    }, 800);

    rightCounter ++;
  } else {
      correctStatus.innerHTML = 'Incorrect';

      setTimeout(function(){
          correctStatus.innerHTML = '';
      }, 800);
    wrongCounter ++;
    timerCount -= 5;
    timerElement.textContent += " -5 seconds"
    setTimeout(function(){
      timerElement.textContent = timerCount;
  }, 800);
    
  };

  questionNumber ++;

  if (event.currentTarget.innerHTML != "Start Quiz") {
    newQuestion();
  }

  if (questionNumber == (questions.length - 1)) {
    timerElement.textContent = 0
    clearInterval(timer)
    finalScoreScreen();
  }

}

// var allEntries = [];
// localStorage.setItem("allEntries", allEntries);
// var initials = localStorage.getItem("initials");
var existingEntries = JSON.parse(localStorage.getItem("allEntries")) || [];

function submitScore() {
  var initials = document.getElementById("initials").value;

  console.log(initials);
  var entry = {
    "userInitials": initials,
    "userScore": rightCounter*10 - wrongCounter*5
  }
  // localStorage.setItem("entry", JSON.stringify(entry));
  if (initials) {
  existingEntries.push(entry);
  localStorage.setItem("allEntries", JSON.stringify(existingEntries));

  location.href = "highscores.html";
  } else {
    window.alert("you must enter initials to submit")
    finalScoreScreen()
  }

}


function finalScoreScreen() {

  timerElement.textContent = "0";
  question.textContent = "All Done!";
  answers.innerHTML ="Your Final Score is " + (rightCounter*10 - wrongCounter*5);


  var text = document.createElement('div');
  var input = document.createElement('input');
  input.setAttribute('id', 'initials')
  input.setAttribute('type', 'text');

  input.setAttribute('value', '');
  

  text.append(input)
  answers.appendChild(text);

  submitButton = document.createElement('button');
  submitButton.innerHTML = "Submit";
  submitButton.addEventListener("click", submitScore);

  answers.appendChild(submitButton);
}

