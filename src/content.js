import { startingIndicator, endingIndicator } from './lib/encoding.js';

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

            //Replace with fire emoji
            // Visually replace "START" with fire emoji, but keep the original text for accessibility/search/etc.
            // Wrap "START" in a <span> with a fire emoji via CSS, leaving the text unchanged
            const span = document.createElement('span');
            span.textContent = startIndicator;
            span.style.fontFamily = 'inherit';
            span.style.position = 'relative';
            span.style.whiteSpace = 'pre';
            span.innerHTML = `<span style="visibility:hidden;">${startIndicator}</span><span style="position:absolute;left:0;top:0;">🔥</span>`;

            // Replace the text node with a fragment containing the visual replacement
            const parent = node.parentNode;
            const before = textContent.slice(0, startIndex);
            const after = textContent.slice(startIndex + startIndicator.length);

            const frag = document.createDocumentFragment();
            if (before) frag.appendChild(document.createTextNode(before));
            frag.appendChild(span);
            if (after) frag.appendChild(document.createTextNode(after));

            parent.replaceChild(frag, node);

            // Look for next occurrence in the same node
            startIndex = textContent.indexOf(startIndicator, startIndex + startIndicator.length);
        }
    }
}

function wrapText(targetText, className = "highlight") {
  if (!targetText) return;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        // Skip if inside input, textarea, or contenteditable element
        if (
          node.parentElement &&
          (
            node.parentElement.closest("input, textarea") ||
            node.parentElement.closest("[contenteditable='true']")
          )
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const regex = new RegExp(targetText, "gi");
  const nodesToReplace = [];

  // Collect nodes first (avoids messing with walker while iterating)
  while (walker.nextNode()) {
    if (regex.test(walker.currentNode.nodeValue)) {
      nodesToReplace.push(walker.currentNode);
    }
  }

  nodesToReplace.forEach(node => {
    const frag = document.createDocumentFragment();
    let lastIndex = 0;
    node.nodeValue.replace(regex, (match, index) => {
      // Text before match
      if (index > lastIndex) {
        frag.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex, index)));
      }

      // The wrapped match
      const span = document.createElement("span");
      span.className = className;
      span.textContent = match;
      frag.appendChild(span);

      lastIndex = index + match.length;
    });

    // Remaining text
    if (lastIndex < node.nodeValue.length) {
      frag.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex)));
    }

    node.parentNode.replaceChild(frag, node);
  });
}

// Runs inside every webpage
console.log("Loaded LatexEverywhere content script");

const style = document.createElement("style");
style.textContent = ".highlight { background: yellow; font-weight: bold; }";
document.head.appendChild(style);

// repeatedly check for LatexEverywhere blocks every 5 seconds
setInterval(() => {
    detectLatexEverywhereBlock();
    wrapText("example");
}, 5000);