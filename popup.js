chrome.browserAction.onClicked.addListener(function(currentTab) {
  chrome.tabs.create({ url: "client/index.html" });
});