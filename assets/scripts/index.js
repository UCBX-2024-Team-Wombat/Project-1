// Variables
const searchInput = document.getElementById("searched-word");
const searchButton = document.getElementById("search");

// Execution
searchButton.addEventListener("click", handleSearch);

// Functions
function handleSearch(event) {
  resetPage();
  const searchedWord = searchInput.value;
  fetchRelatedWords(searchedWord);
  fetchWordGif(searchedWord);
}

// Reset page elements between new word searches
function resetPage() {
  resetModal();
  resetGif();
}
