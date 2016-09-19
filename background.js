// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "title": "Add to Vocab-U-List",
    "contexts": ["selection"]
  });
});

// Called when the user clicks on the browser action.
chrome.contextMenus.onClicked.addListener(function() {
  // Send a message to the active tab
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  // });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    }
  }
);


//add a message listener that will modify the context menu however you see fit
// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.message == 'updateContextMenu') {
//         if (request.selection) {
//             chrome.contextMenus.update('contextMenuId',{
//                 'title': 'New Title',
//                 'enabled': true,
//                 "contexts": ["all"],
//                 'onclick': someFunction
//             });
//         } else {
//             chrome.contextMenus.update('contextMenuId',{
//                 'title': 'Select some text first',
//                 'enabled': false,
//                 "contexts": ["all"]
//             });
//         }
//     } else {
//         sendResponse({});
//     }
// });

//The original context menu.  The important property is the id.  The rest is mostly
//arbitrary because it will be changed dynamically by the listener above.
    chrome.contextMenus.create({
        'id': 'contextMenuId',
        'enabled': false,
        'title': 'Some Title',
        "contexts": ["all"]
        });



// //
// //
// // chrome.contextMenus.create({
// //     "title": "wordSelctor",
// //     "contexts": ["word", "url"],
// //     "onclick" : clickHandler
// //   });
// //
// //
// // var clickHandler = function(e) {
// //   var url = e.pageUrl;
// //   var buzzPostUrl = "http://www.google.com/buzz/post?";
// //
// //   if (e.selectionText) {
// //       // The user selected some text, put this in the message.
// //       buzzPostUrl += "message=" + encodeURI(e.selectionText) + "&";
// //   }
// //
// //   buzzPostUrl += "url=" + encodeURI(url);
// //
// //   // Open the page up.
// //   chrome.tabs.create(
// //         {"url" : buzzPostUrl });
// // };
// // //
// chrome.runtime.onInstalled.addListener(function() {
//   chrome.contextMenus.create({
//     "title": "Add to Vocab-U-List",
//     "contexts":["word", "url"],
//
//   });
// });
//
// // add click event
// chrome.contextMenus.onClicked.addListener(onClickHandler);
//
// // The onClicked callback function.
// function onClickHandler(info, tab) {
//   console.log("you did it!");
//   // var sText = info.selectedWord;
//   // var url = "https://www.google.com/search?q=" + encodeURIComponent(sText);
//   // window.open(url, '_blank');
// }
// // //
// // //
// // // // function messageListener(request) {
// // //   // if(request.type === 'selection') {
// // // //     selectedText = request.selection;
// // // //   }
// // // // }
