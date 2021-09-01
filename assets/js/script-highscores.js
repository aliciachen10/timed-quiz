// var nameAndScore = {
//     initials: initials, 
//     score: score, 
//   }; //TO DO: REVISE THIS SO THAT IT IS AN ARRAY THAT CONTAINS OBJECTS? OR VICE VERSA
var nameAndScore = JSON.parse(localStorage.getItem("nameAndScore"));
if (nameAndScore !== null) {
    document.querySelector(".answers").textContent = nameAndScore.userInitials + " - " + nameAndScore.userScore
}

var clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearScores);

function clearScores() {
  document.querySelector(".answers").textContent = "";
  localStorage.removeItem(nameAndScore);
  //localstorage.clear() is another way to do this 
  // TO DO: clear localstorage.
}