import { binaryToInvisible } from "./encoding";
/**
 * Reads the content of the page for any occurrences of the LatexEverywhere start indicator.
 */
function detectLatexEverywhereBlock() {
    const startIndicator = 'START'; // Example start indicator

    // Search through all text nodes in the document
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walker.nextNode()) {
        const textContent = node.nodeValue;
        let startIndex = textContent.indexOf(startIndicator);
        while (startIndex !== -1) {
            console.log("Detected LatexEverywhere block in text node:", textContent);
            // Further processing can be done here

            // Look for next occurrence in the same node
            startIndex = textContent.indexOf(startIndicator, startIndex + startIndicator.length);
        }
    }
}