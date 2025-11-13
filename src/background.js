chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "Create-Latex-Everywhere-block",
    title: "Create Latex Everywhere block",
    contexts: ["editable"] // only show when right-clicking a text input or textarea
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "Create-Latex-Everywhere-block") {
    chrome.action.openPopup();
  }
  const [tab2] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.scripting.executeScript({
    target: { tabId: tab2.id },
    files: ["insertPopup/popup.js"]
  });
});