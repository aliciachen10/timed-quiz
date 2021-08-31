var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var correctStatus = document.querySelector(".correct-status");
var rightCounter = 0;
var wrongCounter = 0;
var timer;
//var timerCount;

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
    // if (timerCount >= 0) {
    //   // Tests if win condition is met
    //   if (isWin && timerCount > 0) {
    //     // Clears interval and stops timer
    //     clearInterval(timer);
    //     winGame();
    //   }
    // }
    // // Tests if time has run out
    // if (timerCount === 0) {
    //   // Clears interval
    //   clearInterval(timer);
    //   loseGame();
    // }
  }, 1000);
}

// TO DO: un-replicate the code in the start function
function newQuestion() {
  // console.log(answerButtonArray[1].innerHTML);

  //NEXT THING TO DO ::: ONCLICK. IF CORRECT BUTTON IS CLICKED DISPLAY RIGHT OTHERWISE DISPLAY WRONG. 
  // if (answerButtonArray[1].innerHTML === questions[1]['correct answer']) {
  //   console.log("CORRECT!")
  // }
  // //need to clear the div

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
  console.log("WHAT WAS CLICKED >>>", event.currentTarget.innerHTML);
  console.log("CORRECT ANSWER >>>", questions[questionNumber]['correctAnswer']);
  if(event.currentTarget.innerHTML === questions[questionNumber]['correctAnswer']){
    correctStatus.innerHTML = 'CORRECT!!' + rightCounter;

    setTimeout(function(){
        correctStatus.innerHTML = '';
    }, 800);

    rightCounter ++;
  } else {
      correctStatus.innerHTML = 'INCORRECT' + wrongCounter;

      setTimeout(function(){
          correctStatus.innerHTML = '';
      }, 800);
    wrongCounter ++;
  };

  questionNumber ++;

  if (event.currentTarget.innerHTML != "Start Quiz") {
    newQuestion();
  }

  if (questionNumber == (questions.length - 1)) {
    finalScoreScreen();
  }

}

var initials = localStorage.getItem("initials");

// counter.textContent = count;

function submitScore() {
  var initials = document.getElementById("initials").value;

  console.log(initials);
  localStorage.setItem("initials", initials);
  localStorage.setItem("score", rightCounter*10);
  //rightCounter*10


  location.href = "highscores.html";

  renderHighScores();


  //highScores.push({"name": text.input(), "score": rightCounter*10})

}

var nameAndScore = {
  initials: initials, 
  score: score, 
}; //TO DO: REVISE THIS SO THAT IT IS AN ARRAY THAT CONTAINS OBJECTS? OR VICE VERSA

function renderHighScores() {

  var nameAndScore = JSON.parse(localStorage.getItem("nameAndScore"));

  console.log(nameAndScore);
  // if (nameAndScore !== null) {
  //   document.querySelector(".answers").textContent = nameAndScore.name + " - " + 
  //   nameAndScore.score
  // }
}

function finalScoreScreen() {


  question.textContent = "All Done!";
  answers.innerHTML ="Your Final Score is " + rightCounter*10;


  var text = document.createElement('div');
  var input = document.createElement('input');
  input.setAttribute('id', 'initials')
  input.setAttribute('type', 'text');
  // input.innerHTML = "Enter Initials: <input type='text' value='' id='initials' />";
  input.setAttribute('value', '');
  
  // var initialz = document.getElementById("initials");
  text.append(input)
  answers.appendChild(text);

  
  //should probably put this up top 
  submitButton = document.createElement('button');
  submitButton.innerHTML = "Submit";
  submitButton.addEventListener("click", submitScore);

//   var initials = document.querySelector(".initials");
  answers.appendChild(submitButton);

  // console.log(initialz)

  

 
}

