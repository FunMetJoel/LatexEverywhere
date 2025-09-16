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
    const regex = new RegExp(`${startIndicator}(.*?)${middleIndicator}((?:.{8})*?)${endIndicator}`, "gs");
    const nodesToReplace = [];

    while (walker.nextNode()) {
        if (regex.test(walker.currentNode.nodeValue)) {
            nodesToReplace.push(walker.currentNode);
        }
    }

    nodesToReplace.forEach(node => {
        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        node.nodeValue.replace(regex, (match, visiblePart, invisiblePart, index) => {

            // Text before match
            if (index > lastIndex) {
                frag.appendChild(document.createTextNode(node.nodeValue.slice(lastIndex, index)));
            }

            // The wrapped match, without indicators
            // <span class="LatexEverywhere-block">
            //   <span class="visible-part">visiblePart</span>
            //   <span class="invisible-part" style="display:none;">invisiblePart</span>
            // </span>

            const span = document.createElement("span");
            span.className = "LatexEverywhere-block";
            span.setAttribute('data', match.replace('\u200B', '₁').replace('\u200C', '₀')); // store original data in attribute, replacing invisible chars by ₀ and ₁
            if (visiblePart) {
                const visibleSpan = document.createElement("span");
                visibleSpan.className = "visible-part";
                visibleSpan.textContent = visiblePart;
                span.appendChild(visibleSpan);
            }
            if (invisiblePart) {
                const invisibleSpan = document.createElement("span");
                invisibleSpan.className = "invisible-part";
                // add latex formula in parameter to invisibleSpan
                invisibleSpan.setAttribute('data-latex', invisiblePart);
                invisibleSpan.setAttribute('decoded-data-latex', decodeFromInvisible(invisiblePart));
                const decoded = decodeFromInvisible(invisiblePart);
                try {
                    katex.render(decoded, invisibleSpan, { throwOnError: false });
                } catch (e) {
                    invisibleSpan.textContent = decoded; // Fallback to plain text if rendering fails
                }
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