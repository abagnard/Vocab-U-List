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


function saveWord() {
  chrome.storage.sync.clear()
  vocabWord = vocabWord.toLowerCase();
  var wordInfo = {'type': wordType, 'def': wordDef};
  var jsonWordObj = {};
  jsonWordObj[vocabWord] = wordInfo;

  chrome.storage.sync.set(jsonWordObj, function () {
    alert(`you added "${vocabWord}" to your list!`);
  });
}


// //called when new tab gets opened
// window.onload = function() {
//   //document.addEventListener("DOMContentLoaded")
//   chrome.storage.sync.get(null, function(jsonWordObj) {
//     //get all words in storage
//     var allKeys = Object.keys(jsonWordObj);
//     let randNum = Math.floor(Math.random() * (allKeys.length));
//     let tabWord = allKeys[randNum];
//
//     chrome.storage.sync.get(tabWord, function(jsonWordObj){
//       //get random word's info from storage
//       document.getElementById("htmlWord").innerHTML = tabWord;
//       document.getElementById("htmlType").innerHTML = jsonWordObj[tabWord].type;
//
//       let allDefs = jsonWordObj[tabWord].def;
//       var olList = document.createElement('ol');
//       for(var i = 0; i < allDefs.length; i++) {
//         var liItem = document.createElement('li');
//         liItem.appendChild(document.createTextNode(allDefs[i]));
//         olList.appendChild(liItem);
//       }
//       document.getElementById("htmlDef").appendChild(olList);
//     });
//   });
// };



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
        let word = xmlhttpRequest.responseXML.firstChild.getElementsByTagName("entry")[0];
        getWordInfo(word);
      } else {
        alert("**ERROR** Word cannot be found in dictionary. Unable to be added to Vocab-U-List.");
      }
    }
  };
}



function getWordInfo(word) {
  if (!word.getElementsByTagName("fl")[0]) {   //if no word type returned, word not in dictionary
    alert (`We're sorry. Unable to find ${vocabWord} in dictionary -- not added to Vocab-U-List.`);
  } else {
    wordType = word.getElementsByTagName("fl")[0].firstChild.nodeValue;
    wordDef = [];

    //traverse through tag tree to find definition ("dt" or "un" tags)
    for(let i = 0; i < word.getElementsByTagName("dt").length; i ++) {
      if (!word.getElementsByTagName("dt")[i].firstChild.nodeValue){
        for(let j = 0; j < word.getElementsByTagName("dt")[i].getElementsByTagName("un").length; j++) {
          if (word.getElementsByTagName("dt")[i].getElementsByTagName("un")[j].firstChild.nodeValue){
            let wordUn = word.getElementsByTagName("dt")[i].getElementsByTagName("un")[j].firstChild.nodeValue;
            let formatedDef = wordUn.replace(/:/gi, '') || wordUn;
            if (formatedDef !== "" && formatedDef !== ":" && wordDef.length < 4) {
              wordDef.push(formatedDef);
            }
          }
          else {
            alert (`We're sorry. Unable to find ${vocabWord} in dictionary -- not added to Vocab-U-List.`);
          }
        }
      } else {
        let wordDt = word.getElementsByTagName("dt")[i].firstChild.nodeValue;
        let formatedDef = wordDt.replace(/:/gi, '') || wordDt;
        if (formatedDef !== "" && formatedDef !== ":" && wordDef.length < 4) {
          wordDef.push(formatedDef);
        }
      }
    }
    saveWord();
  }
}


// chrome.storage.sync.get(null, function (data) { console.info(data) });
