import { binaryToInvisible, decodeFromInvisible } from "./encoding";
import { startIndicator, endIndicator, middleIndicator } from "./encoding";

/**
 * Reads the content of the page for any occurrences of the LatexEverywhere start indicator.
 */
export function detectLatexEverywhereBlock() {
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
    // Starting with the start indicator and ending with the end indicator
    const regex = new RegExp(`${startIndicator}(.*?)${endIndicator}`, "gs");
    const nodesToReplace = [];

    while (walker.nextNode()) {
        if (regex.test(walker.currentNode.nodeValue)) {
        nodesToReplace.push(walker.currentNode);
        }
    }

    nodesToReplace.forEach(node => {
        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        node.nodeValue.replace(regex, (match, inner, index) => {
            // Text before match
            if (index > lastIndex) {
                frag.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex, index)));
            }

            // split in visible and invisible parts at middleIndicator
            const parts = inner.split(middleIndicator);
            const visiblePart = parts[0];
            const invisiblePart = parts[1] || '';

            // The wrapped match, without indicators
            // <span class="LatexEverywhere-block highlight">
            //   <span class="visible-part">visiblePart</span>
            //   <span class="invisible-part" style="display:none;">invisiblePart</span>
            // </span>


            const span = document.createElement("span");
            span.className = "LatexEverywhere-block highlight";
            if (visiblePart) {
                const visibleSpan = document.createElement("span");
                visibleSpan.className = "visible-part";
                visibleSpan.textContent = visiblePart;
                span.appendChild(visibleSpan);
            }
            if (invisiblePart) {
                const invisibleSpan = document.createElement("span");
                invisibleSpan.className = "invisible-part";
                invisibleSpan.style.display = "none";
                invisibleSpan.textContent = decodeFromInvisible(invisiblePart);
                span.appendChild(invisibleSpan);
            }

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