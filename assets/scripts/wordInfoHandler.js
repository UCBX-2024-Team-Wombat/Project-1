// Variables

const searchInputEl = document.getElementById("searched-word");
const searchBtn = document.getElementById("search");
const wordInfoElement = document.getElementById("word-info");
const apiKey = "948a3ec4-0862-47ce-bf63-b217e7cbcc75";

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
          if (Object.keys(wordInfo).includes("hom") ||
              wordInfo['meta']['id'] == word ) {
            const wordObj = {};
            //hw is the API identifier for the searched word
            wordObj["headword"] = wordInfo.hwi.hw.replace(/\*/gi, "");
            // retrieve word type, not within hwi object
            wordObj["wordType"] = wordInfo.fl;
            // prs is the API keyword for pronunciation
            if ("prs" in wordInfo.hwi) {
              if ("mw" in wordInfo.hwi.prs) {
                wordObj["pronunciation"] = wordInfo.hwi.prs[0].mw; // mw = Merriam-Webster format
              }
              if ("sound" in wordInfo.hwi.prs) {
                wordObj["wordAudio"] = wordInfo.hwi.prs[0].sound.audio;
              }
            }

            if ("et" in wordInfo) {
              wordObj["etymology"] = wordInfo.et[0];
            }

            getDefinitions(wordInfo, wordObj);
            wordArray.push(wordObj);
          }
        }
      }

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

function saveToLocalStorage(wordInfo) {
  localStorage.setItem("wordInfo", JSON.stringify(wordInfo));
}

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

function writeWordInfo(wordArray) {
  const wordInfoDisplay = document.getElementById("word-info");

  for (const wordInfo of wordArray) {
    const wordCard = createWordCard(wordInfo);
    wordInfoDisplay.appendChild(wordCard);
  }
}

function createWordCard(word) {
  const wordCard = document.createElement("div");
  wordCard.setAttribute("class", "card word-card");

  // Construct word type (POS = part of speech)
  const wordPOS = document.createElement("div");
  wordPOS.classList.add("word-type");
  wordPOS.innerHTML = `<span class='boldify'>Word Type</span>: ${word.wordType}`;
  wordCard.appendChild(wordPOS);

  // Construct etymology
  const wordEtymology = document.createElement("div");
  wordEtymology.classList.add("word-etymology");
  wordEtymology.innerHTML = `<span class='boldify'>Etymology</span>: ${word.etymology}`;
  wordCard.appendChild(wordEtymology);

  // Construct definitions
  const definitionsWrapper = document.createElement("div");
  definitionsWrapper.innerHTML = "<span class='boldify'>Definition(s)</span>";
  const definitionUnorderedList = document.createElement("ul");

  for (const definition of word.definition) {
    const definitionListItem = document.createElement("li");
    definitionListItem.innerHTML = definition;
    definitionUnorderedList.appendChild(definitionListItem);
  }

  definitionsWrapper.appendChild(definitionUnorderedList);
  wordCard.appendChild(definitionsWrapper);

  return wordCard;
}
