let vocabWord = "";
let valid;

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

// chrome.runtime.onMessage.addListener(function(request) {
//   vocabWord = request.word;
//   valid = request.valid;
//   chrome.contextMenus.create({
//     "title": "Add to Vocab-U-List",
//     "contexts": ["all"],
//     'id': 'contextMenuId'
//   });
// });

//called when the user clicks on the contextMenus' option
chrome.contextMenus.onClicked.addListener(function() {
  if (valid === true) {
    alert(`you added "${vocabWord}" to your list!`);
    getDefinition();
  } else if (vocabWord === "") {
    alert("Please select a word to add to your Vocab-U-List");
  } else {
    alert(`"${vocabWord}" is not valid word.`);
    vocabWord = "";
  }
});



// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "open_new_tab" ) {
//       chrome.tabs.create({"url": request.url});
//     }
//   }
// );



//called when word successfully added to list
function getDefinition(){
  let dictionaryURL = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + vocabWord + "?key=d3f5c888-db47-4c06-8c91-c65cc8a39137";

  //initialize ajax call to dictionary.php to get meaning of the word.
  let xmlhttpRequest = new XMLHttpRequest();
  xmlhttpRequest.open("GET", dictionaryURL, true); //operate translate in async mode.
  xmlhttpRequest.send();

  xmlhttpRequest.onreadystatechange = function () {
    if (xmlhttpRequest.readyState === 4) {
      if (xmlhttpRequest.status === 200) {
          alert("Picture dictionary lookup returned with response = " + xmlhttpRequest.responseText);
          //decode json to get the translated text.
      } else {
        alert("**ERROR** Word cannot be found in dictionary. Unable to be added to Vocab-U-List.");
      }
    }
  };
}


//MY DICTIONARY INFO:
// let dictionaryAPI = "d3f5c888-db47-4c06-8c91-c65cc8a39137";
// let apiUrl = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/hypocrite?key=[YOUR KEY GOES HERE]"
