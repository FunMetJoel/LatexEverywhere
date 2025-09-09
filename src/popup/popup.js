import { startingIndicator, endingIndicator } from '../lib/encoding.js';
export function copyExample() {
    const example = `${startingIndicator}E=mc^2${endingIndicator}`;
    navigator.clipboard.writeText(example).then(() => {
        console.log('Example copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy example: ', err);
    });
}

// run copyExample when the button is clicked
document.getElementById('copyExampleBtn').addEventListener('click', copyExample);