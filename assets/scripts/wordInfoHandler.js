// Variables

const searchInputEl = document.getElementById("searched-word");
const searchBtn = document.getElementById("search");
const wordInfoElement = document.getElementById("word-info");
const apiKey = "948a3ec4-0862-47ce-bf63-b217e7cbcc75";

const invalidInputs = [null, undefined, ' ']

/* --------------------- Functions -------------------*/
// get word data from API
function fetchWordInfo(word) {
  //set the URL for the fetch function
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;

  // send HTTP request
  fetch(url)
    .then(function (response) {
      // if the request fails, show the JSON error. Otherwise, return the successful promise
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (wordData) {
      // empty array to store the different word elements we will retrieve
      const wordArray = [];

      for (const wordInfo of wordData) {

        if (typeof wordInfo === "object") {
          // conditions for successful search:
          // if searched word has homonyms OR searched word matches the API meta id
          if (Object.keys(wordInfo).includes("hom") ||
              wordInfo['meta']['id'] == word ) {
            // create word object to store word keys
            const wordObj = {};
            //hw = API identifier for the searched word
            wordObj["headword"] = wordInfo.hwi.hw.replace(/\*/gi, "");
            // retrieve word type (part of speech)
            wordObj["wordType"] = wordInfo.fl;
            // prs = API identifier for pronunciation
            if ("prs" in wordInfo.hwi) {
              // mw = written pronunciation format
              if ("mw" in wordInfo.hwi.prs[0]) {
                wordObj["pronunciation"] = wordInfo.hwi.prs[0].mw; // mw = Merriam-Webster format
              }
              // audio = verbal pronunciation, using audio link format 
              if ("sound" in wordInfo.hwi.prs[0]) {
                wordObj["wordAudio"] = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${word.charAt(0)}/${wordInfo.hwi.prs[0].sound.audio}.mp3`;
              }
            }
            // et = API identifier for etymology
            if ("et" in wordInfo) {
              wordObj["etymology"] = wordInfo.et[0];
            }
            // call function to retrieve all definitions and add the 
            // entire word object to the array
            getDefinitions(wordInfo, wordObj);
            wordArray.push(wordObj);
          }
        }
      }

      // do we need this error checking here is it is being done in index.js?
      if (wordArray.length == 0) {
        const errorNotice = document.createElement("h3");
        errorNotice.innerText =
          "No results found. Please check spelling and try again.";
        wordInfoElement.appendChild(errorNotice);
      } else {
        writeWordInfo(wordArray);
        saveToLocalStorage(wordArray);
      }
    });
}

// save the searched word data to local storage
function saveToLocalStorage(wordInfo) {
  localStorage.setItem("wordInfo", JSON.stringify(wordInfo));
}

// reset the section under "Word Info" title to blank
function resetWordInfo() {
  wordInfoElement.innerHTML = null;
}

function getDefinitions(wordInfo, wordObj) {
  wordObj.definition = [];

  for (const definitionWrapper of wordInfo.def) {
    // wordInfo.def returns an array of objects
    if ("sseq" in definitionWrapper) {
      // If sseq is a key in the current object, loop
      // through returned array values
      for (const sseqArrayValue of definitionWrapper.sseq) {
        // for each array value, check if that value has an array
        // of its own. Then loop through that array
        // (which has a mixed array value)
        console.log("sseqArrayValue");
        console.log(sseqArrayValue);
        for (const mixedValueArray of sseqArrayValue) {
          // mixedValueArray has both strings and objects.
          // We want the objects only
          console.log("mixedValueArray");
          console.log(mixedValueArray);

          if (mixedValueArray[0] == "sense") {
            // dt returns an array of strings.
            // The first string is a signifier, the second
            // is the actual definition.
            const dt = mixedValueArray[1]["dt"];
            console.log("dt");
            console.log(dt);

            for (const dtArrayValue of dt) {
              // If first value in dtArray is string "text",
              // get value in second index
              console.log("dtArrayValue");
              console.log(dtArrayValue);
              if (dtArrayValue[0] == "text") {
                // regular expression created to remove excess notations for easier reading
                wordObj.definition.push(
                  dtArrayValue[1].replace(
                    /\{bc\}|\{dx_ety\}.*?\{\/dx_ety\}|\{dx_def\}.*?\{\/dx_def\}|\{.*?\||\|\|\}|\|.*?\}|\|\|.*?\}|\}/g, "")
                );
              }
            }
          }
        }
      }
    }
  }
}
// render word details to the webpage
function writeWordInfo(wordArray) {
  const wordInfoDisplay = document.getElementById("word-info");
  // for every word found in the API, render a word card
  for (const wordInfo of wordArray) {
    const wordCard = createWordCard(wordInfo);
    wordInfoDisplay.appendChild(wordCard);
  }
}

// render word data to the webpage
function createWordCard(word) {
  const wordCard = document.createElement("div");
  wordCard.setAttribute("class", "card word-card");

  // Construct word type (POS = part of speech)
  const wordPOS = document.createElement("div");
  wordPOS.classList.add("word-type");
  wordPOS.innerHTML = `<span class='boldify'>Word Type</span>: ${word.wordType}`;
  wordCard.appendChild(wordPOS);

  // Construct pronunciation, written and audio
  const wordPronunciation = document.createElement("div");
  wordPronunciation.classList.add("word-pronunciation");
  wordPronunciation.innerHTML = `<span class='boldify'>Pronunciation</span>: ${word.pronunciation} (<a href="${word.wordAudio}" target="_blank">Click to listen</a>)`;
  wordCard.appendChild(wordPronunciation);

  // Construct etymology
  const wordEtymology = document.createElement("div");
  wordEtymology.classList.add("word-etymology");
  wordEtymology.innerHTML = `<span class='boldify'>Etymology</span>: ${word.etymology}`;
  wordCard.appendChild(wordEtymology);

  // Construct definitions
  const definitionsWrapper = document.createElement("div");
  definitionsWrapper.innerHTML = "<span class='boldify'>Definition(s)</span>";
  const definitionUnorderedList = document.createElement("ul");

  // add each definition on the webpage as a list item
  for (const definition of word.definition) {
    const definitionListItem = document.createElement("li");
    definitionListItem.innerHTML = definition;
    definitionUnorderedList.appendChild(definitionListItem);
  }

  // append definition list to word card
  definitionsWrapper.appendChild(definitionUnorderedList);
  wordCard.appendChild(definitionsWrapper);

  return wordCard;
}
