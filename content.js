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
      let word = window.getSelection().toString();
      if(word.length > 0 && word.indexOf(" ") === -1) {
        chrome.runtime.sendMessage({
          'word': word,
          'valid': true
        });
      } else {
        chrome.runtime.sendMessage({
          'word': word,
          'valid': false
        });
      }
    }
}, true);
