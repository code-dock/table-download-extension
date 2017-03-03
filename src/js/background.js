/* global chrome */

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(() => {
  // No tabs or host permissions needed!
    chrome.tabs.executeScript(
    null,
    { file: "js/injected.js" },
    () => {
        document.querySelector("h1").innerHTML = "Download complete";
    }
  );
});
