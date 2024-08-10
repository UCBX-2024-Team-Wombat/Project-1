// Variables
const searchInput = document.getElementById('searched-word');
const searchButton = document.getElementById('search');

// Execution
searchButton.addEventListener('click', handleSearch)

// Functions
function handleSearch(event){
  const searchedWord = searchInput.value;
  fetchRelatedWords(searchedWord);
  fetchWordGif(searchedWord);
}

/* 
File Explaination (To Delete):

This file will serve as a sort of traffic-light/director for the other javascript files, as well as 
handling responsibilities not covered by other files (adding event listeners, opening/closing modals)
*/