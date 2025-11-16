import { startIndicator, endIndicator, middleIndicator } from '../lib/encoding.js';
import { encodeToInvisible } from '../lib/encoding.js';
import { unicodify } from '../lib/latexParcer.js';
// import '../lib/katex.min.js';
import katex from 'katex';

export function copyExample() {
    const latex = document.getElementById('latexInput').value || 'y=ax+b';
    const example = `${startIndicator}${unicodify(latex)}${middleIndicator}${encodeToInvisible(latex)}${endIndicator}`;
    navigator.clipboard.writeText(example).then(() => {
        console.log('Example copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy example: ', err);
    });
}

// run copyExample when the button is clicked
document.getElementById('copyExampleBtn').addEventListener('click', copyExample);

document.getElementById('showUnicode').addEventListener('change', function() {
    const mode = this.checked ? 'unicode' : 'latex';
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'set-mode', mode: mode }, function(response) {
            console.log(response.status);
        });
    });
});

document.getElementById('latexInput').addEventListener('input', function() {
    const latex = this.value;
    const outputLatexDiv = document.getElementById('LatexOutput');
    const outputUnicodeDiv = document.getElementById('UnicodeOutput');

    if (latex.trim() === '') {
        outputDiv.outputLatexDiv = '';
        outputDiv.outputUnicodeDiv = '';
        return;
    }

    try {
        const unicode = unicodify(latex);
        outputUnicodeDiv.innerHTML = unicode;


        outputLatexDiv.innerHTML = katex.renderToString(latex, { throwOnError: false });
    } catch (err) {
        outputDiv.innerHTML = '<span style="color: red;">Invalid LaTeX</span>';
    }
});
