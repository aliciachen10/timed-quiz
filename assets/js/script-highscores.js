var allEntries = JSON.parse(localStorage.getItem("allEntries"));
// var userList = document.getElementById("user-list")
console.log(allEntries)

// list.sort((a, b) => (a.color > b.color) ? 1 : -1)

if (allEntries.length > 0) {
  for (i = 0; i < allEntries.length; i++) {
    console.log(allEntries[i]['userInitials'])
    var userList = document.querySelector(".user-list")
    var input = document.createElement('li'); 
    input.textContent = allEntries[i]['userInitials'] + " - " + allEntries[i]['userScore']
    userList.appendChild(input)
  }
}
// if (nameAndScore !== null) {
//     document.querySelector(".answers").textContent = nameAndScore.userInitials + " - " + nameAndScore.userScore
// }

var clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearScores);

function clearScores() {
  document.querySelector(".answers").textContent = "";
  localStorage.removeItem("allEntries");
}