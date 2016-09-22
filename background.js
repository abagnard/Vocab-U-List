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
  xmlhttpRequest.overrideMimeType('text/xml');
  xmlhttpRequest.open("GET", dictionaryURL, true); //operate translate in async mode.
  xmlhttpRequest.send();

  xmlhttpRequest.onreadystatechange = function () {
    if (xmlhttpRequest.readyState === 4) {
      if (xmlhttpRequest.status === 200) {
        alert("Picture dictionary lookup returned with response = " + xmlhttpRequest.responseText);

        let word = xmlhttpRequest.responseXML.firstChild.getElementsByTagName("entry")[0];
        wordType = word.getElementsByTagName("fl")[0].firstChild.nodeValue;
        // wordDef = word.getElementsByTagName("dt")[0].firstChild;
        for(let i = 0; i < word.getElementsByTagName("dt").length; i ++) {
          // let firstLetter = word.getElementsByTagName("dt")[i].firstChild.nodeValue[0];
          // firstLetter = firstLetter.replace(/:/gi, '');
          if (word.getElementsByTagName("dt")[i].firstChild.nodeValue !== "") {
            wordDef.push(word.getElementsByTagName("dt")[i].firstChild.nodeValue);
          }
        }
        // console.log(word);
        // console.log(wordType);
        // console.log(wordDef);
        // debugger
        alert(`vocabWord = ${vocabWord}; word = ${word}; type = ${wordType};  def = ${wordDef}`);
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
