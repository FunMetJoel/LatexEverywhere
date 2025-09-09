import { startIndicator, endIndicator, middleIndicator } from '../lib/encoding.js';
import { encodeToInvisible } from '../lib/encoding.js';
export function copyExample() {
    const example = `${startIndicator}y=ax+b${middleIndicator}${encodeToInvisible("HALLO?")}${endIndicator}`;
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
