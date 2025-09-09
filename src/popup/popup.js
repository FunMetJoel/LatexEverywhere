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