import { startIndicator, endIndicator, middleIndicator } from '../lib/encoding.js';
import { encodeToInvisible } from '../lib/encoding.js';
import { unicodify } from '../lib/unicodify.js';

var inputElement = null;
document.addEventListener("contextmenu", function(event){
    if (!(event.target.closest("#LatexEverywhereFullscreenOverlayContainer"))) {
        inputElement = event.target;
    } 
}, true);

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

    const cancelButton = container.querySelector("#cancelLatexEverywhereBtn");
    cancelButton.addEventListener("click", (e) => {
        container.classList.add("latex-everywhere-invisible");
    });

    const confirmButton = container.querySelector("#insertLatexEverywhereBtn");
    confirmButton.addEventListener("click", () => {
        container.classList.add("latex-everywhere-invisible");
        const latex = document.querySelector('#LatexEverywhereLatexInput').value;
        const element = `${startIndicator}${unicodify(latex)}${middleIndicator}${encodeToInvisible(latex)}${endIndicator}`;
        inputElement.value += element;
    });

    container.querySelector('#LatexEverywhereLatexInput').addEventListener('input', function () {
        const latex = this.value;
        const outputLatexDiv = container.querySelector('#LatexOutput');
        const outputUnicodeDiv = container.querySelector('#UnicodeOutput');

        if (latex.trim() === '') {
            outputLatexDiv = '';
            outputUnicodeDiv = '';
            return;
        }

        try {
            const unicode = unicodify(latex);
            outputUnicodeDiv.innerHTML = unicode;
            outputLatexDiv.innerHTML = katex.renderToString(latex, { throwOnError: false });
        } catch (err) {
            outputUnicodeDiv.innerHTML = '<span style="color: red;">Invalid LaTeX</span>';
        }
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'show-LatexInvisible-popup') {
        document.getElementById("LatexEverywhereFullscreenOverlayContainer").classList.remove("latex-everywhere-invisible");
        sendResponse({status: 'Show popup'});
    }
});