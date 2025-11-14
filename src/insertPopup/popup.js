window.addEventListener("load", async () => {
    // Fetch overlay HTML file
    const overlayUrl = chrome.runtime.getURL("insertPopup/popup.html");
    const res = await fetch(overlayUrl);
    const html = await res.text();

    // Create container
    const container = document.createElement("div");
    container.id = "LatexEverywhereFullscreenOverlayContainer";
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.zIndex = "10000";
    container.innerHTML = html;

    document.body.appendChild(container);

    container.classList.add("latex-everywhere-invisible");

    // Add event listener to backgound to close overlay
    const background = container.querySelector("#LatexEverywherePopup-Background");
    background.addEventListener("click", (e) => {
        if (e.target === background) {
            container.classList.add("latex-everywhere-invisible");
        }   
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'show-LatexInvisible-popup') {
        document.getElementById("LatexEverywhereFullscreenOverlayContainer").classList.remove("latex-everywhere-invisible");
        sendResponse({status: 'Show popup'});
    }
});