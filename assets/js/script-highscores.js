// var nameAndScore = {
//     initials: initials, 
//     score: score, 
//   }; //TO DO: REVISE THIS SO THAT IT IS AN ARRAY THAT CONTAINS OBJECTS? OR VICE VERSA
var nameAndScore = JSON.parse(localStorage.getItem("nameAndScore"));
if (nameAndScore !== null) {
    document.querySelector(".answers").textContent = nameAndScore.userInitials + " - " + nameAndScore.userScore
}

// text += localStorage.getItem(key)  + "<br>" ;
//   function renderHighScores() {
  
//     var nameAndScore = JSON.parse(localStorage.getItem("nameAndScore"));
  
//     console.log(nameAndScore);
//     if (nameAndScore !== null) {
//       document.querySelector(".answers").textContent = "hello there"
//     //   nameAndScore.userInitials + " - " + 
//     //   nameAndScore.userScore
//     }
//   }

  var clearButton = document.querySelector(".clear");
  clearButton.addEventListener("click", clearScores);

  function clearScores() {
    document.querySelector(".answers").textContent = "";
    localStorage.removeItem(nameAndScore);
    //localstorage.clear() is another way to do this 
    // TO DO: clear localstorage.
    //   document.querySelector(".answers").textContent = "HELLO THERE"
  }