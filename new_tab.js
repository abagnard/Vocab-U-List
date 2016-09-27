//called when new tab gets opened

document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.sync.get(null, function(jsonWordObj) {
    //get all words in storage
    var allKeys = Object.keys(jsonWordObj);
    let randNum = Math.floor(Math.random() * (allKeys.length));
    let tabWord = allKeys[randNum];

    chrome.storage.sync.get(tabWord, function(jsonWordObj){
      //get random word's info from storage
      document.getElementById("htmlWord").innerHTML = tabWord;
      document.getElementById("htmlType").innerHTML = jsonWordObj[tabWord].type;

      let allDefs = jsonWordObj[tabWord].def;
      var olList = document.createElement('ol');
      for(var i = 0; i < allDefs.length; i++) {
        var liItem = document.createElement('li');
        liItem.appendChild(document.createTextNode(allDefs[i]));
        olList.appendChild(liItem);
      }
      document.getElementById("htmlDef").appendChild(olList);
    });
  });
});
