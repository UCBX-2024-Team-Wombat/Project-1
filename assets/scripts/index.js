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