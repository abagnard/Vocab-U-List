let valid;
let vocabWord = "";
let wordType = "";
let wordDef = [];


// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "title": "Add to Vocab-U-List",
    "contexts": ["all"],
    'id': 'contextMenuId'
  });
});

//redefine global variables
chrome.runtime.onMessage.addListener(function(request) {
  vocabWord = request.word;
  valid = request.valid;
});


//called when the user clicks on the contextMenus' option
chrome.contextMenus.onClicked.addListener(function() {
  if (valid === true) {
    dictionaryAjax();
  } else if (vocabWord === "") {
    alert("Please select a word to add to your Vocab-U-List");
  } else {
    alert(`"${vocabWord}" is not valid word.`);
    vocabWord = "";
  }
});


//called when word successfully added to list
function dictionaryAjax(){
  let dictionaryURL = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + vocabWord + "?key=d3f5c888-db47-4c06-8c91-c65cc8a39137";

  //initialize ajax call to MW dictionary to get meaning of the word.
  let xmlhttpRequest = new XMLHttpRequest();
  xmlhttpRequest.overrideMimeType('text/xml');
  xmlhttpRequest.open("GET", dictionaryURL, true); //operate translate in async mode.
  xmlhttpRequest.send();

  xmlhttpRequest.onreadystatechange = function () {
    if (xmlhttpRequest.readyState === 4) {
      if (xmlhttpRequest.status === 200) {
        alert(xmlhttpRequest.responseText);

        //if response contains "suggestion" tag , word is not in dictionary
        if (xmlhttpRequest.responseXML.firstChild.getElementsByTagName("suggestion")[0]) {
          alert (`We're sorry, "${vocabWord}" not found.`);
        } else {
          debugger
          let word = xmlhttpRequest.responseXML.firstChild.getElementsByTagName("entry")[0];
          getWordInfo(word);
        }

      } else {
        alert("**SERVER ERROR**");
      }
    }
  };
}



function getWordInfo(word) {
  debugger
  wordType = word.getElementsByTagName("fl")[0].firstChild.nodeValue;
  wordDef = [];

  //traverse through tag tree to find definition ("dt" or "un" tags)
  for(let i = 0; i < word.getElementsByTagName("dt").length; i ++) {
    let wordDt = "";
    let wantedNodes = ["fw", "d_link"];
    for (let j = 0; j < word.getElementsByTagName("dt")[i].childNodes.length; j++){
      let child = word.getElementsByTagName("dt")[i].childNodes[j];
      if (child.nodeName === "#text"){
        wordDt += `${child.nodeValue} `;
      } else if (wantedNodes.includes(child.nodeName)) {
        wordDt += `${child.innerHTML} `;
      } else if (child.nodeName === "un"){
        wordDt += `${child.firstChild.nodeValue} `;
      } else {
        wordDt += "";
      }
    }

    let formatedDef = wordDt.replace(/:/gi, '') || wordDt;
    let validWord = formatedDef.split("").every(el => ["", " ", ":"].includes(el));

    if (!validWord && formatedDef.length > 0 && wordDef.length < 4) {
      wordDef.push(formatedDef);
    }
  }
  if (wordDef.length > 0) {
    saveWord();
  }
}


function saveWord() {
  // chrome.storage.sync.clear()
  vocabWord = vocabWord.toLowerCase();
  var wordInfo = {'type': wordType, 'def': wordDef};
  var jsonWordObj = {};
  jsonWordObj[vocabWord] = wordInfo;

  chrome.storage.sync.set(jsonWordObj, function () {
    alert(`you added "${vocabWord}" to your list!`);
  });
}


// chrome.storage.sync.get(null, function (data) { console.info(data) });
