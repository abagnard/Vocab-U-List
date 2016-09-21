let vocabWord = "";
let valid;

// Set up context menu at install time.
// chrome.runtime.onInstalled.addListener(function() {
//   chrome.contextMenus.create({
//     "title": "Add to Vocab-U-List",
//     "contexts": ["all"],
//     'id': 'contextMenuId'
//   });
// });

chrome.runtime.onMessage.addListener(function(request) {
  // alert("background onMessage being called!");
  if(request.type === 'createContextMenu') {
    vocabWord = request.word;
    valid = request.valid;
    chrome.contextMenus.create({
      "title": "Add to Vocab-U-List",
      "contexts": ["all"],
      'id': 'contextMenuId'
    });
  }
});
// chrome.runtime.onMessage.addListener(function(request) {
//   vocabWord = request.word;
// });


chrome.contextMenus.onClicked.addListener(function() {
  if (valid === true) {
    alert("you added " + vocabWord + " to your list!");
  } else if (vocabWord === "") {
    alert("Please select a word to add to your Vocab-U-List");
  } else {
    alert(`"${vocabWord}" is not valid word.`);
    vocabWord = "";
  }
});

// // Called when the user clicks on the contextMenus' option
// chrome.contextMenus.onClicked.addListener(function(word, tab) {
//   alert(word.selectionText);
//   // Send a message to the active tab
//   // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   //   var activeTab = tabs[0];
//   // console.log("you did it!");
//   // alert("you did it!");
//   chrome.tabs.create({"url": "http://google.com"});
//   // chrome.tabs.sendMessage(tab.id, {"message": "clicked_browser_action"});
// });


// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "open_new_tab" ) {
//       chrome.tabs.create({"url": request.url});
//     }
//   }
// );

// function getDefinition(word){
//   let dictionaryURL = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + word + "?key=d3f5c888-db47-4c06-8c91-c65cc8a39137";
//
//   //initialize ajax call to dictionary.php to get meaning of the word.
//   let xmlhttpRequest = new XMLHttpRequest();
//   xmlhttpRequest.open("GET", dictionaryurl, true); //operate translate in async mode.
//   xmlhttpRequest.send();
//
//   xmlhttpRequest.onreadystatechange = function () {
//     if (xmlhttpRequest.readyState === 4) {
//       if (xmlhttpRequest.status === 200) {
//           alert("Picture dictionary lookup returned with response = " + xmlhttpRequest.responseText);
//           //decode json to get the translated text.
//       } else {
//         console.log("error");
//       }
//     }
//   };
// }
//
// function saveWord(){
//
// }
//

//MY DICTIONARY INFO:
// let dictionaryAPI = "d3f5c888-db47-4c06-8c91-c65cc8a39137";
// let apiUrl = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/hypocrite?key=[YOUR KEY GOES HERE]"
