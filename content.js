// alert("Hello from your Chrome extension!");
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     alert("in content script!");
//     if( request.message === "clicked_browser_action" ) {
//       // var firstHref = "http://google.com";
//       //
//
//       chrome.runtime.sendMessage({"message": "open_new_tab", "url": "http://google.com"});
//     }
//   }
// );

document.addEventListener("mousedown", function(event){
    if (event.button === 2) {
      // alert("in mousedown event!");
      // let word = "";

      let word = window.getSelection().toString();
      if(word.length > 0 && word.indexOf(" ") === -1) {
        // alert(word.indexOf(" "));
        // alert(word.length);
              //get selected text and send request to bkgd page to create menu
        chrome.runtime.sendMessage({
          'word': word,
          'type': 'createContextMenu',
          'valid': true
        });

      } else {
        chrome.runtime.sendMessage({
          'word': word,
          'type': 'createContextMenu',
          'valid': false
        });
      }
    }

}, true);

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
