// Variables
const searchButton = document.getElementById('search');

// Execution
searchButton.addEventListener('click', handleSearch)

// Functions
function handleSearch(event){
  const searchedWord = document.getElementById('searched-word').value;
<<<<<<< HEAD
  fetchWordInfo(searchedWord);
  // console.log(wordInfo);
  fetchWordFrequency(searchedWord);
=======
  // fetchWordInfo(searchedWord);
  fetchRelatedWords(searchedWord);
>>>>>>> d34e5ce1eea64e17b37f39568a981a179a133135
  fetchWordGif(searchedWord);
}

/* 
File Explaination (To Delete):

This file will serve as a sort of traffic-light/director for the other javascript files, as well as 
handling responsibilities not covered by other files (adding event listeners, opening/closing modals)
*/