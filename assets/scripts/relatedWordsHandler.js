// Variables
const relatedWordsLocalStorageKey = 'project-1-dictionary-api-key';
const thesaurusBaseUrl = 'https://api.api-ninjas.com/v1/thesaurus?';

// Functions

function fetchRelatedWords(searchedWord){

  const queryString = thesaurusBaseUrl + new URLSearchParams({
    word: searchedWord,
    "X-Api-Key": getThesaurusApiKey()
  }).toString()

  fetch(queryString)
    .then(response => {
      return response.json();
    })
    .then(data => {
      populateModalContent(data);
    })
}

function populateModalContent(data){

  const synonyms = data.synonyms;
  const antonyms = data.antonyms;

  // Handle modal population once modal is built
}

// Utility methods for storing and retrieving giphy api key
function storeThesaurusAPIKey(apiKey) {
  localStorage.setItem(relatedWordsLocalStorageKey, apiKey);
}

function getThesaurusApiKey() {
  return localStorage.getItem(relatedWordsLocalStorageKey);
}