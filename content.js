alert("Hello from your Chrome extension!");
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      // var firstHref = "http://google.com";
      //
      // alert("in content script!");

      chrome.runtime.sendMessage({"message": "open_new_tab", "url": "http://google.com"});
    }
  }
);

// document.addEventListener("mousedown", function(event){
//     if (event.button !== 2) {
//         return false;
//     }
//     var selected = window.getSelection().toString();
//         if(event.button == 2 && selected != '') {
//                 //get selected text and send request to bkgd page to create menu
//             chrome.extension.sendMessage({
//                    'message': 'updateContextMenu',
//                    'selection': true});
//         } else {
//         chrome.extension.sendMessage({
//                    'message': 'updateContextMenu',
//                    'selection': false});
//         }
// }, true);

// document.addEventListener('mouseup',function()
// {
//     var selectedWord = window.getSelection().toString();
//     var url = window.location.href;
//     if(selectedWord.length > 0) {
//       chrome.runtime.sendMessage(
//         {
//           'type': 'selected',
//           'selection': selectedWord
//         }
//       );
//
// }});


// if(selectedWord.length > 0)
//     chrome.extension.sendRequest({
//       'message':'setText',
//       'data': selectedWord,
//       'url': url
//     },
//     function(response){})
