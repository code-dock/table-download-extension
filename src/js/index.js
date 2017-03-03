/* global chrome */
chrome.tabs.executeScript(
  null,
  { file: "js/injected.js" },
  () => {
      document.querySelector("h1").innerHTML = "Download complete";
  }
);
