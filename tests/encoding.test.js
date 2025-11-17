import { describe, test, it, expect } from "vitest";
import { decodeFromInvisible, encodeToInvisible } from "../src/lib/encoding.js"

describe('simple reversibility', () => {
    it('encode a character', () => {
        const stringToEncode = "A";
        const invisibleString = encodeToInvisible(stringToEncode);
        expect(decodeFromInvisible(invisibleString)).toBe(stringToEncode);
    });
});