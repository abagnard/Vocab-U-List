// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "title": "Add to Vocab-U-List",
    "contexts": ["all"],
    'id': 'contextMenuId'
  });
});

// Called when the user clicks on the contextMenus' option


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  // if (e.selectionText) {
  //   console.log(e.selectionText);
  // }
  alert(info.selectionText);
  // Send a message to the active tab
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   var activeTab = tabs[0];
  // console.log("you did it!");
  // alert("you did it!");
    chrome.tabs.sendMessage(tab.id, {"message": "clicked_browser_action"});
  // });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    }
  }
);
