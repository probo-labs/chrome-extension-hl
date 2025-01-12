console.log('This is the background page.');
// Listen for commands (shortcut keys)
chrome.commands.onCommand.addListener(async (command) => {
  if (command === "toggle-highlight") {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      // Retrieve the selected option from chrome.storage
      chrome.storage.local.get("selectedOption", (data) => {
        const elementType = data.selectedOption || "CLICKABLE"; // Default to CLICKABLE
        chrome.tabs.sendMessage(tab.id, {
          action: "highlight",
          elementType,
        });
      });
    }
  }
});

// Enable the side panel when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  // Enable the side panel
  chrome.sidePanel.setOptions({
    enabled: true
  });
});

// Optional: Toggle side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});
