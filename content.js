document.addEventListener("mousedown", function(event){
    if (event.button === 2) {
      let word = window.getSelection().toString();
      if (word[word.length - 1] === " ") {
        word = word.slice(0, word.length - 1);
      }

      if(word.length > 0 && checkWord(word)) {
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


function checkWord(word) {
 return (
   (word.indexOf(" ") === -1) &&
   (word.indexOf(",") === -1) &&
   (word.indexOf(".") === -1) &&
   (word.indexOf('"') === -1)
 );
}
