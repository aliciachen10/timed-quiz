// var nameAndScore = {
//     initials: initials, 
//     score: score, 
//   }; //TO DO: REVISE THIS SO THAT IT IS AN ARRAY THAT CONTAINS OBJECTS? OR VICE VERSA
  
  function renderHighScores() {
  
    var nameAndScore = JSON.parse(localStorage.getItem("nameAndScore"));
  
    console.log(nameAndScore);
    if (nameAndScore !== null) {
      document.querySelector(".answers").textContent = "hello there"
    //   nameAndScore.userInitials + " - " + 
    //   nameAndScore.userScore
    }
  }

  var clearButton = document.querySelector(".clear");
  clearButton.addEventListener("click", clearScores);

  function clearScores() {
    document.querySelector(".answers").textContent = ""
    //   document.querySelector(".answers").textContent = "HELLO THERE"
  }