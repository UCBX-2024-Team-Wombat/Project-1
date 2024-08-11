// Variables
const searchInput = document.getElementById("searched-word");
const searchButton = document.getElementById("search");
const invalidWordNotice = document.getElementById('invalid-word-notice');

// Execution
searchButton.addEventListener("click", handleSearch);

// Functions
<<<<<<<<< Temporary merge branch 1
function handleSearch(event) {
  const searchedWord = searchInput.value.trim();
  if(isValidWord(searchedWord)){
    hideInvalidWordNotice();
    resetPage();
    fetchWordInfo(searchedWord);
    fetchRelatedWords(searchedWord);
    fetchWordGif(searchedWord);
  }
  else {
    displayInvalidWordNotice();
  }
=========
function handleSearch(event){
  const searchedWord = document.getElementById('searched-word').value;
  fetchWordInfo(searchedWord);
  fetchRelatedWords(searchedWord);
  fetchWordGif(searchedWord);
>>>>>>>>> Temporary merge branch 2
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