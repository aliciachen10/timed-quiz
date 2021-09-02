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

//enter the array of questions the user will answer here
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
    correctAnswer: "console.log"},

    {question: "String values must be enclosed within ___ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "quotes"}
  ]

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

//the startgame function is called when the start button is clicked
function startGame() {
    timerCount = 40;
    //prevents start button from being clicked when round is in progress 
    startButton.disabled = true; 
    startButton.remove();

    startTimer()
    newQuestion()
};

// startTimer begins the timer countdown from the number specified above in timerCount
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

//this is what displays when each answer button is clicked
function newQuestion() {

  question.textContent = questions[questionNumber]['question'];
  answers.innerHTML =""; //or answers.textContent ="";

  //CREATE ONE ANSWER BUTTONS ONE FOR EACH POSSIBLE ANSWER IN THE ARRAY 
  for (var i = 0; i < questions[questionNumber]['choices'].length; i++){
    answerButtonArray[i] = document.createElement('button');
    answerButtonArray[i].innerHTML = i+1 + ". " + questions[questionNumber]['choices'][i];
    answerButtonArray[i].addEventListener("click", questionCorrect);
    answers.appendChild(answerButtonArray[i]);

    linebreak = document.createElement("br");
    answers.appendChild(linebreak);
  }
  
};

// tell the user whether the answer was correct or not 
function questionCorrect(event) {
  if(event.currentTarget.innerHTML.substring(3, event.currentTarget.innerHTML.length) === questions[questionNumber]['correctAnswer']){
    correctStatus.innerHTML = '<hr> Correct';
    setTimeout(function(){
        correctStatus.innerHTML = '';
    }, 800);

    rightCounter ++;
  } else {
      correctStatus.innerHTML = '<hr> Incorrect';

      setTimeout(function(){
          correctStatus.innerHTML = '';
      }, 800);
    wrongCounter ++;
    //subtract time if the answer was incorrect
    timerCount -= 5;
    timerElement.textContent += " -5 seconds"
    setTimeout(function(){
      timerElement.textContent = timerCount;
    }, 800);
  };

  //once we reach the end of the questions, clear timer interval, set timerCount to zero and go to final score screen
  if (questionNumber == (questions.length-1)) {
    console.log(questionNumber)
    clearInterval(timer)
    timerCount = 0;
    finalScoreScreen();
  }

  console.log(questionNumber)
  questionNumber ++;

    //go onto a new question if the button clicked is not "start quiz"
    if (event.currentTarget.innerHTML != "Start Quiz") {
      newQuestion();
    }

}

//get allentries from localstorage OR an empty array if it doesn't exist 
var existingEntries = JSON.parse(localStorage.getItem("allEntries")) || [];

//submit score
function submitScore() {
  var initials = document.getElementById("initials").value;

  if ((rightCounter*10 - wrongCounter*5) >= 0) {
    var entry = {
      "userInitials": initials,
      "userScore": rightCounter*10 - wrongCounter*5
    }
  } else {
    var entry = {
      "userInitials": initials,
      "userScore": 0
    }
  }

  //push the user's score to localstorage
  if (initials) {
  existingEntries.push(entry);
  localStorage.setItem("allEntries", JSON.stringify(existingEntries));

  //go to the highscores page after finishing
  location.href = "highscores.html";
  } else {
    //if the user has not entered initials, prompt them to enter initials
    window.alert("you must enter initials to submit")
    finalScoreScreen()
  }

}

// all done screen
function finalScoreScreen() {

  timerElement.textContent = "0";
  question.textContent = "All Done!";

  // display user's score
  if ((rightCounter*10 - wrongCounter*5) >= 0) {
    answers.innerHTML ="Your Final Score is " + (rightCounter*10 - wrongCounter*5) + "."
  } else {
    //if score was negative, set it to be 0
    answers.innerHTML = "Your Final Score is 0."
  }
  var space = document.createElement('br')
  answers.appendChild(space)

  //create a space for users to enter initials
  var enterInitials = document.createTextNode('Enter initials: ')
  answers.appendChild(enterInitials);

  var input = document.createElement('input');
  input.setAttribute('id', 'initials')
  input.setAttribute('type', 'text');

  input.setAttribute('value', '');
  
  answers.appendChild(input);

  submitButton = document.createElement('button');
  submitButton.innerHTML = "Submit";
  submitButton.addEventListener("click", submitScore);

  answers.appendChild(submitButton);
}

