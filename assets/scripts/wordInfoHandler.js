// Variables


// Functions
function fetchWordInfo(word) {
  console.log(`Fetching info for ${word}`);
  fetchDataFromAPI(word)
  .then((wordDefinitionWrappers) => {
    writeDefinitionsToPage(wordDefinitionWrappers);
  });
}

function fetchDataFromAPI(word){}

function wrapWordDefinition(wordDefinition){}

function writeDefinitionsToPage(wordDefinitionWrappers){}


/* 
File Explaination (To Delete):

This file is responsible for collecting core word data, including
- List of definitions
  - part of speech for each definition
  - "type of" information
  - Sentence examples
- Syllable info
*/