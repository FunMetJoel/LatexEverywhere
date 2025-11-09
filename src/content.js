// import "katex/dist/katex.min.css";

import { detectLatexEverywhereBlock } from './lib/rendering.js';
import { parseLatex } from './lib/latexParcer.js';

// Runs inside every webpage
console.log("Loaded LatexEverywhere content script");

const style = document.createElement("style");
style.textContent = "body[latex-everywhere-mode='unicode'] .invisible-part { display: none; }";
style.textContent += "body[latex-everywhere-mode='latex'] .visible-part { display: none; }";
document.head.appendChild(style);
document.body.setAttribute('latex-everywhere-mode', 'latex'); // default mode

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

let test = parseLatex("mc^{2+2-3^5}");
test.print();
console.log(
    test.unicodify()
);

let test2 = parseLatex("a^{b+c-d}");
test2.print();
console.log(
    test2.unicodify()
);

let test3 = parseLatex("x*y-z");
test3.print();
console.log(
    test3.unicodify()
);

let test4 = parseLatex("(x+y)^{(a-b+c)}");
test4.print();
console.log(
    test4.unicodify()
);

let test5 = parseLatex("(x+y)^{m*n}");
test5.print();
console.log(
    test5.unicodify()
);