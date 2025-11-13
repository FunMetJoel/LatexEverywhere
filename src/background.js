chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "Create-Latex-Everywhere-block",
    title: "Create Latex Everywhere block",
    contexts: ["editable"] // only show when right-clicking a text input or textarea
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "Create-Latex-Everywhere-block") {
    chrome.action.openPopup();
  }
});