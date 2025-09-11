import "katex/dist/katex.min.css";

import { detectLatexEverywhereBlock } from './lib/rendering.js';


// Runs inside every webpage
console.log("Loaded LatexEverywhere content script");

const style = document.createElement("style");
style.textContent = ".highlight { background-color: red; font-weight: bold; }";
style.textContent += "body[latex-everywhere-mode='unicode'] .invisible-part { display: none; }";
style.textContent += "body[latex-everywhere-mode='latex'] .visible-part { display: none; }";
document.head.appendChild(style);

// repeatedly check for LatexEverywhere blocks every second
setInterval(() => {
    detectLatexEverywhereBlock();
}, 1000);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'set-mode') {
        document.body.setAttribute('latex-everywhere-mode', message.mode);
        sendResponse({status: 'mode set to ' + message.mode});
    }
});