chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get(() => {
    chrome.scripting.executeScript({
      files: ["script.js"],
      target: { tabId: tab.id, allFrames: true },
    });
  });
});
