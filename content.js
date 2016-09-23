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
