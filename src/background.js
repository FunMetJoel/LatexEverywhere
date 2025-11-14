chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "Create-Latex-Everywhere-block",
    title: "Create Latex Everywhere block",
    contexts: ["editable"] // only show when right-clicking a text input or textarea
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "Create-Latex-Everywhere-block") {
    // Get active tab
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!activeTab?.id) {
      console.error("No active tab found");
      return;
    }

    // Send message to content script
    chrome.tabs.sendMessage(activeTab.id, { type: "show-LatexInvisible-popup" }, (response) => {
      console.log(response?.status);
    });
  }
});
