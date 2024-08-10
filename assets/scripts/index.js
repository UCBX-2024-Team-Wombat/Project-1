// Variables
const searchInput = document.getElementById("searched-word");
const searchButton = document.getElementById("search");
const invalidWordNotice = document.getElementById('invalid-word-notice');

// Execution
searchButton.addEventListener("click", handleSearch);

// Functions
function handleSearch(event) {
  const searchedWord = searchInput.value.trim();
  if(isValidWord(searchedWord)){
    hideInvalidWordNotice();
    resetPage();
    fetchRelatedWords(searchedWord);
    fetchWordGif(searchedWord);
  }
  else {
    displayInvalidWordNotice();
  }
}

// Reset page elements between new word searches
function resetPage() {
  resetModal();
  resetGif();
}

function isValidWord(word){
  
  // Regex pattern derived from modification of pattern
  // provided here: https://regex101.com/r/caXjPb/1
  const pattern = /^(?:[a-z-']{2,}|-?)$/;

  return pattern.test(word);
}

function displayInvalidWordNotice(){
  invalidWordNotice.removeAttribute('hidden');
}

function hideInvalidWordNotice(){
  invalidWordNotice.setAttribute('hidden', 'true');
}