//get item allEntries from localstorage 
var allEntries = JSON.parse(localStorage.getItem("allEntries"));

// sort entries so they appear in descending order
allEntries.sort((a, b) => (a.userScore < b.userScore) ? 1: -1)

// if entries exist, print them on the screen in list format
if (allEntries) {
  for (i = 0; i < allEntries.length; i++) {
    var userList = document.querySelector(".user-list")
    var input = document.createElement('li'); 
    input.textContent = allEntries[i]['userInitials'] + "   ---   " + allEntries[i]['userScore']
    userList.appendChild(input)
  }
}

// clear entries from screen
var clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearScores);

function clearScores() {
  document.querySelector(".answers").textContent = "";
  localStorage.removeItem("allEntries");
}