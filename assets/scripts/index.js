// Variables
const searchInput = document.getElementById("searched-word");
const searchButton = document.getElementById("search");
const invalidWordNotice = document.getElementById('invalid-word-notice');
const searchedWordsLocalStorageKey = 'searched-words';

// Execution
searchButton.addEventListener("click", handleSearch);

// Functions
function handleSearch(event) {
  const searchedWord = searchInput.value.trim();

  if(isValidWord(searchedWord)){
    storeSearchedWord(searchedWord);
    hideInvalidWordNotice();
    resetPage();
    fetchWordInfo(searchedWord);
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
  resetWordInfo();
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

function storeSearchedWord(word){

  const searchHistory = retrieveSearchedWords();
  // Add searched word to storage list
  searchHistory.unshift(word);

  // Remove any repeated searches
  let indexToRemove;

  for (let i = 1; i < searchHistory.length; i++) {
    const pastWord = searchHistory[i];

    if(word == pastWord){
      indexToRemove = i;
    }
  }

  if(indexToRemove != undefined){
    searchHistory.splice(indexToRemove, 1);
  }

  // Set local storage to updated list
  localStorage.setItem(searchedWordsLocalStorageKey, JSON.stringify(searchHistory));
}

// Return local
function retrieveSearchedWords(){
    // Retrieve local storage
    const localStorageWords = localStorage.getItem(searchedWordsLocalStorageKey);
    // Verify local storage is valid and array
    const localStorageWordsValid = (localStorageWords != null && localStorageWords.includes('[')); 
    // Return json parsed local storage if valid, otherwise empty array
    return localStorageWordsValid ? JSON.parse(localStorageWords) : [];
}