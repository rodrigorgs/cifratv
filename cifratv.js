chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.insertCSS(tab.id, {file: "tv.css"});
  chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function() {
    chrome.tabs.executeScript(null, {file: "jquery.columnizer.js"}, function() {
      chrome.tabs.executeScript(null, {file: "cifraclub.js"});
    });
  });
  
	// TODO: check if it's a cifra page
    // var regexPage = new RegExp(/https:\/\/www.google.com.mx\//); // We use a regular expresion to check which page was given.
    // var match = regexPage.exec(tab.url); // We then check if the given page matches our expression.
    // // If it matches and the status of the tab is complete...
    // if(match && tab.status === 'complete') {

});