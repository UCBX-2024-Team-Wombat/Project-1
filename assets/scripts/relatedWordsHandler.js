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

  const modalDisplayElement = document.getElementById('related-words-display');
  modalDisplayElement.setAttribute('class', 'columns content');
  modalDisplayElement.innerText = null;

  const synonyms = data.synonyms;
  const antonyms = data.antonyms;

  synonyms.sort();
  antonyms.sort();

  if(isValidList(synonyms) == false && isValidList(antonyms) === false){
    modalDisplayElement.innerText = `Sorry, we couldn't find any synonyms or antonyms for ${data.word}`;
  }

  if(isValidList(synonyms)){
    const synonymsColumn = createUnorderedList(synonyms, 'Synonyms');
    modalDisplayElement.appendChild(synonymsColumn);
  }
  
  if(isValidList(antonyms)){
    const antonymsColumn = createUnorderedList(antonyms, 'Antonyms');
    modalDisplayElement.appendChild(antonymsColumn);
  }

  const modalButtonWrapper = document.getElementById('modal-button-wrapper');
  modalButtonWrapper.removeAttribute('hidden');
}

function isValidList(list){
  const joinedListValues = list.join('');
  return joinedListValues != '' && list.length > 0;
}

function createUnorderedList(list, listTitle){

  const listWrapper = document.createElement('div');
  listWrapper.setAttribute('class','column');

  const listTitleDisplay = document.createElement('p');
  listTitleDisplay.innerText = listTitle;
  listWrapper.appendChild(listTitleDisplay);

  const unorderedList = document.createElement('ul');

  for(const stringValue of list){
    // Create parent list element
    const listItem = document.createElement('li');
    // Create anchor tag to indicate click-ability
    const anchor = document.createElement('a');
    // Set text as anchor's inner text and custom data-word attribute to word 
    anchor.innerText = stringValue;
    anchor.setAttribute('data-word', stringValue);

    //
    listItem.appendChild(anchor);
    unorderedList.appendChild(listItem);
  }

  listWrapper.appendChild(unorderedList);

  return listWrapper;
}

// Utility methods for storing and retrieving giphy api key
function storeThesaurusAPIKey(apiKey) {
  localStorage.setItem(relatedWordsLocalStorageKey, apiKey);
}

function getThesaurusApiKey() {
  return localStorage.getItem(relatedWordsLocalStorageKey);
}