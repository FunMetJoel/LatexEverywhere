chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "custom-option",
    title: "Create Latex Everywhere block",
    contexts: ["editable"] // only show when right-clicking a text input or textarea
  });
});