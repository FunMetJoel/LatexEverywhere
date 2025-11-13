(async () => {
    // Fetch overlay HTML file
    const overlayUrl = chrome.runtime.getURL("insertPopup/popup.html");
    const res = await fetch(overlayUrl);
    const html = await res.text();

    // Create container
    const container = document.createElement("div");
    container.id = "myFullscreenOverlayContainer";
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.zIndex = "10000";
    container.innerHTML = html;

    document.body.appendChild(container);

    // Close button handler
    const closeBtn = container.querySelector(".close-btn");
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            container.remove();
        });
    }
})();
