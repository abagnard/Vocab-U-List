let wordList;
let vocabWord = "";
let wordType = "";
let wordDef = [];
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
    getDefinition();
    alert(`you added "${vocabWord}" to your list!`);
  } else if (vocabWord === "") {
    alert("Please select a word to add to your Vocab-U-List");
  } else {
    alert(`"${vocabWord}" is not valid word.`);
    vocabWord = "";
  }
});


function saveWord() {
  // chrome.storage.sync.clear()
    var word = vocabWord.toLowerCase(),
        wordInfo = {
            'def': wordDef,
            'type': wordType
        };
    var jsonWordObj = {};
    jsonWordObj[word] = wordInfo;
    chrome.storage.sync.set(jsonWordObj, function () {
        alert(`${word} has been added to your Vocab-U-List, ${wordInfo}`);
    });
    getRandomWord(jsonWordObj);
    // chrome.storage.sync.get(null, function (data) { console.info(data) });
    // debugger
    // chrome.storage.sync.get(null, function(items) {
    //     var allKeys = Object.keys(items);
    //     console.log(jsonWordObj);
    //     console.log(jsonWordObj[allKeys[0]]);
    //     console.log(jsonWordObj[allKeys[0].type]);
    //     console.log(jsonWordObj[allKeys[0].def]);
    // });
}

function getRandomWord(jsonWordObj){
  chrome.storage.sync.get(null, function(jsonWordObj) {
      var allKeys = Object.keys(jsonWordObj);
      let randNum = Math.floor(Math.random() * (allKeys.length + 1));
      // debugger
      console.log(allKeys[randNum] +": "+ jsonWordObj[allKeys[randNum]].type +" : "+ jsonWordObj[allKeys[randNum]].def);
  });
}



//called when word successfully added to list
function getDefinition(){
  let dictionaryURL = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + vocabWord + "?key=d3f5c888-db47-4c06-8c91-c65cc8a39137";

  //initialize ajax call to MW dictionary to get meaning of the word.
  let xmlhttpRequest = new XMLHttpRequest();
  xmlhttpRequest.overrideMimeType('text/xml');
  xmlhttpRequest.open("GET", dictionaryURL, true); //operate translate in async mode.
  xmlhttpRequest.send();

  xmlhttpRequest.onreadystatechange = function () {
    if (xmlhttpRequest.readyState === 4) {
      if (xmlhttpRequest.status === 200) {
        alert("Picture dictionary lookup returned with response = " + xmlhttpRequest.responseText);

        //set word type
        //responseXML gets data as XML data
        let word = xmlhttpRequest.responseXML.firstChild.getElementsByTagName("entry")[0];
        debugger
        wordType = word.getElementsByTagName("fl")[0].firstChild.nodeValue;

        //set definition
        wordDef = [];
        for(let i = 0; i < word.getElementsByTagName("dt").length; i ++) {
          if (!word.getElementsByTagName("dt")[i].firstChild.nodeValue){
            for(let j = 0; j < word.getElementsByTagName("dt")[i].getElementsByTagName("un").length; j++) {
              if (word.getElementsByTagName("dt")[i].getElementsByTagName("un")[j].firstChild.nodeValue){
                let formatedWordUn = word.getElementsByTagName("dt")[i].getElementsByTagName("un")[j].firstChild.nodeValue.replace(/:/gi, '') || word.getElementsByTagName("dt")[i].getElementsByTagName("un")[j].firstChild.nodeValue;
                word.getElementsByTagName("dt")[i];
                if (formatedWordUn !== "") {
                  wordDef.push(formatedWordUn);
                }
              }
            }
          } else {
            // debugger
            let formatedWord = word.getElementsByTagName("dt")[i].firstChild.nodeValue.replace(/:/gi, '') ||    word.getElementsByTagName("dt")[i].firstChild.nodeValue;
            if (formatedWord !== "") {
              wordDef.push(formatedWord);
            }
          }
        }
        // console.log(word);
        // console.log(wordType);
        // console.log(wordDef);
        // debugger
        alert(`vocabWord = ${vocabWord}; word = ${word}; type = ${wordType};  def = ${wordDef}`);
        if (word) {
          saveWord();
        } else {
          alert ("**ERROR** Word cannot be found in dictionary. Unable to be added to Vocab-U-List.");
        }

      } else {
        alert("**ERROR** Word cannot be found in dictionary. Unable to be added to Vocab-U-List.");
      }
    }
  };

}

//MY DICTIONARY INFO:
// let dictionaryAPI = "d3f5c888-db47-4c06-8c91-c65cc8a39137";
// let apiUrl = "http://www.dictionaryapi.com/api/v1/references/collegiate/xml/hypocrite?key=[YOUR KEY GOES HERE]"


// Changes XML to JSON
// https://davidwalsh.name/convert-xml-json
function xmlToJson(xml) {
	var obj = {};
	if (xml.nodeType === 1) {
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType === 3) {
		obj = xml.nodeValue;
    alert(obj);
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) === "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) === "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;

}
