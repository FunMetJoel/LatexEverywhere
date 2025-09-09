import { detectLatexEverywhereBlock } from './lib/rendering.js';

// Runs inside every webpage
console.log("Loaded LatexEverywhere content script");

const style = document.createElement("style");
style.textContent = ".highlight { color: red; font-weight: bold; }";
document.head.appendChild(style);

// repeatedly check for LatexEverywhere blocks every 5 seconds
setInterval(() => {
    detectLatexEverywhereBlock();
}, 5000);