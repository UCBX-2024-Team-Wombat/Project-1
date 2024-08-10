// Variables
const searchInput = document.getElementById('searched-word');
const searchButton = document.getElementById('search');
const modalButtonWrapper = document.getElementById('modal-button-wrapper');
const modalDisplayElement = document.getElementById('related-words-display');
const embedSlot = document.getElementById('gif-embed-slot');

// Execution
searchButton.addEventListener('click', handleSearch)

// Functions
function handleSearch(event){
  resetPage();
  const searchedWord = searchInput.value;
  fetchRelatedWords(searchedWord);
  fetchWordGif(searchedWord);
}

// Reset page elements between new word searches
function resetPage(){
  // Hide modal button and reset content
  modalButtonWrapper.setAttribute('hidden', 'true');
  modalDisplayElement.innerText = null;
  // Reset gif
  embedSlot.innerHTML = null;  
}