/**
 * Encodes string to invisible characters binary representation.
 * @param {string} inputString 
 * @returns 
 */
export function encodeToInvisible(inputString) {
    let invisibleString = '';
    const encoder = new TextEncoder();
    const inputBinary = encoder.encode(inputString);;
    for (const byte of inputBinary) {
        for (let i = 7; i >= 0; i--) {
            invisibleString += (byte & (1 << i)) ? '\u200B' : '\u200C'; // Zero-width space for '1', zero-width non-joiner for '0'
        }
    }
    return invisibleString;
}

export function binaryToInvisible(binaryString) {
    let invisibleString = '';
    for (const bit of binaryString) {
        invisibleString += (bit === '1') ? '\u200B' : '\u200C'; // Zero-width space for '1', zero-width non-joiner for '0'
    }
    return invisibleString;
}

export const startIndicator = binaryToInvisible('00000001'); // SOH
export const middleIndicator = binaryToInvisible('00000010'); // STX
export const endIndicator = binaryToInvisible('00000011'); // ETX

/**
 * Decodes invisible characters binary representation back to string.
 * @param {string} invisibleString 
 * @returns 
 */
export function decodeFromInvisible(invisibleString) {
    let binaryString = '';
    for (const char of invisibleString) {
        if (char === '\u200B') {
            binaryString += '1';
        } else if (char === '\u200C') {
            binaryString += '0';
        }
    }

    const byteArray = [];
    for (let i = 0; i < binaryString.length; i += 8) {
        const byte = binaryString.slice(i, i + 8);
        if (byte.length === 8) {
            byteArray.push(parseInt(byte, 2));
        }
    }

    const decoder = new TextDecoder();
    return decoder.decode(new Uint8Array(byteArray));
}
