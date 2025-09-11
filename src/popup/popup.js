import { startIndicator, endIndicator, middleIndicator } from '../lib/encoding.js';
import { encodeToInvisible } from '../lib/encoding.js';
import { unicodify } from '../lib/unicodify.js';
import '../lib/katex.min.js';

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

document.getElementById('highlightToggle').addEventListener('change', function() {
    const mode = this.checked ? 'unicode' : 'latex';
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'set-mode', mode: mode }, function(response) {
            console.log(response.status);
        });
    });
});

document.getElementById('latexInput').addEventListener('input', function() {
    const latex = this.value;
    const outputDiv = document.getElementById('renderedOutput');
    if (latex.trim() === '') {
        outputDiv.innerHTML = '';
        return;
    }

    try {
        const unicode = unicodify(latex);
        outputDiv.innerHTML = unicode;

        outputDiv.innerHTML += ' | '; // Clear previous content

        const html = katex.renderToString(latex, { throwOnError: false });
        outputDiv.innerHTML += html;
    } catch (err) {
        outputDiv.innerHTML = '<span style="color: red;">Invalid LaTeX</span>';
    }
});
