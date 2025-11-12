export abstract class Expression {
    abstract print(indent: number): void;
    abstract unicodify(): string;
    abstract canSuperScript(): boolean;
    abstract canSubScript(): boolean;
    getSuperscript(): string {
        throw new Error("getSuperscript not implemented for this expression");
    };
    getSubscript(): string {
        throw new Error("getSubscript not implemented for this expression");
    }
}

export class Add extends Expression {
    first: Expression;
    second: Expression;

    constructor(first: Expression, second: Expression) {
        super();
        this.first = first;
        this.second = second;
    }

    print(indent: number = 0) {
        this.first.print(indent + 1);
        console.log("..".repeat(indent) + "+");
        this.second.print(indent + 1);
    }

    unicodify(): string {
        return this.first.unicodify() + " + " + this.second.unicodify();
    }

    getSuperscript(): string {
        return this.first.getSuperscript() + '⁺' + this.second.getSuperscript();
    }

    canSuperScript(): boolean {
        return this.first.canSuperScript() && this.second.canSuperScript();
    }

    getSubscript(): string {
        return this.first.getSubscript() + '₊' + this.second.getSubscript();
    }

    canSubScript(): boolean {
        return this.first.canSubScript() && this.second.canSubScript();
    }
}

export class Subtract extends Expression {
    first: Expression;
    second: Expression;
    constructor(first: Expression, second: Expression) {
        super();
        this.first = first;
        this.second = second;
    }

    print(indent: number = 0) {
        this.first.print(indent + 1);
        console.log("..".repeat(indent) + "-");
        this.second.print(indent + 1);
    }

    unicodify(): string {
        return this.first.unicodify() + " - " + this.second.unicodify();
    }

    getSuperscript(): string {
        return this.first.getSuperscript() + '⁻' + this.second.getSuperscript();
    }

    canSuperScript(): boolean {
        return this.first.canSuperScript() && this.second.canSuperScript();
    }

    getSubscript(): string {
        return this.first.getSubscript() + '₋' + this.second.getSubscript();
    }

    canSubScript(): boolean {
        return this.first.canSubScript() && this.second.canSubScript();
    }
}

export class Multiply extends Expression {
    first: Expression
    second: Expression;
    constructor(first: Expression, second: Expression) {
        super();
        this.first = first;
        this.second = second;
    }

    print(indent: number = 0) {
        this.first.print(indent + 1);
        console.log("..".repeat(indent) + "*");
        this.second.print(indent + 1);
    }

    unicodify(): string {
        return this.first.unicodify() + " ∗ " + this.second.unicodify();
    }

    getSuperscript(): string {
        return this.first.getSuperscript() + '*' + this.second.getSuperscript();
    }

    canSuperScript(): boolean {
        return this.first.canSuperScript() && this.second.canSuperScript();
    }

    canSubScript(): boolean {
        return false;
    }

}

export class Fraction extends Expression {
    numerator: Expression;
    denominator: Expression;
    constructor(numerator: Expression, denominator: Expression) {
        super();
        this.numerator = numerator;
        this.denominator = denominator;
    }

    print(indent: number = 0) {
        this.numerator.print(indent + 1);
        console.log("..".repeat(indent) + "/");
        this.denominator.print(indent + 1);
    }

    unicodify(): string {
        return "(" + this.numerator.unicodify() + ")/(" + this.denominator.unicodify() + ")";
    }

    canSuperScript(): boolean {
        return false;
    }

    canSubScript(): boolean {
        return false;
    }
}

export class Superscript extends Expression {
    exponent: Expression;
    constructor(exponent: Expression) {
        super();
        this.exponent = exponent;
    }

    print(indent: number = 0) {
        console.log("..".repeat(indent) + "^");
        this.exponent.print(indent + 1);
    }

    unicodify(): string {
        if (this.exponent.canSuperScript()) {
            return this.exponent.getSuperscript();
        } else {
            return "^(" + this.exponent.unicodify() + ")";
        }
    }

    getSuperscript(): string {
        return "ᣔ⁽" + this.exponent.getSuperscript() + "⁾";
    }

    canSuperScript(): boolean {
        return this.exponent.canSuperScript();
    }

    canSubScript(): boolean {
        return false;
    }
}

export class Subscript extends Expression {
    subscript: Expression
    constructor(subscript: Expression) {
        super();
        this.subscript = subscript;
    }

    print(indent: number = 0) {
        console.log("..".repeat(indent) + "_");
        this.subscript.print(indent + 1);
    }

    unicodify(): string {
        if (this.subscript.canSubScript()) {
            return this.subscript.getSubscript();
        } else {
            return "_(" + this.subscript.unicodify() + ")";
        }
    }

    canSuperScript(): boolean {
        return false;
    }

    canSubScript(): boolean {
        return false;
    }
}

export class SquareRoot extends Expression {
    radicand: Expression
    constructor(radicand: Expression) {
        super();
        this.radicand = radicand;
    }

    print(indent: number = 0) {
        console.log("..".repeat(indent) + "sqrt(");
        this.radicand.print(indent + 1);
        console.log("..".repeat(indent) + ")");
    }

    unicodify(): string {
        return "√(" + this.radicand.unicodify() + ")";
    }

    canSuperScript(): boolean {
        return false;
    }

    canSubScript(): boolean {
        return false;
    }
}

export class Root extends Expression {
    degree: Expression;
    radicand: Expression;
    constructor(degree: Expression, radicand: Expression) {
        super();
        this.degree = degree;
        this.radicand = radicand;
    }

    print(indent: number = 0) {
        console.log("..".repeat(indent) + "root(");
        this.degree.print(indent + 1);
        console.log("..".repeat(indent) + ",");
        this.radicand.print(indent + 1);
        console.log("..".repeat(indent) + ")");
    }

    unicodify(): string {
        if(this.degree.canSuperScript()) {
            return this.degree.getSuperscript() + "√(" + this.radicand.unicodify() + ")";
        } else {
            return "[" + this.degree.unicodify() + "]√(" + this.radicand.unicodify() + ")";
        }
    }

    canSuperScript(): boolean {
        return false;
    }

    canSubScript(): boolean {
        return false;
    }
}

export class BracketedExpression extends Expression {
    expression: Expression;
    constructor(expression: Expression) {
        super();
        this.expression = expression;
    }
    
    print(indent: number = 0) {
        console.log("..".repeat(indent) + "(");
        this.expression.print(indent + 1);
        console.log("..".repeat(indent) + ")");
    }

    unicodify(): string {
        return "(" + this.expression.unicodify() + ")";
    }

    getSuperscript(): string {
        return "⁽" + this.expression.getSuperscript() + "⁾";
    }

    canSuperScript(): boolean {
        return this.expression.canSuperScript();
    }

    getSubscript(): string {
        return "₍" + this.expression.getSubscript() + "₎";
    }

    canSubScript(): boolean {
        return this.expression.canSubScript();
    }
}

export class ConsecutiveExpression extends Expression {
    value1: Expression;
    value2: Expression;
    constructor(value1: Expression, value2: Expression) {
        super();
        this.value1 = value1;
        this.value2 = value2;
    }
    print(indent: number = 0) {
        this.value1.print(indent + 1);
        console.log("..".repeat(indent) + "CONSECUTIVE");
        this.value2.print(indent + 1);
    }

    unicodify(): string {
        return this.value1.unicodify() + this.value2.unicodify();
    }

    canSuperScript(): boolean {
        return false; // TODO: Make this check first
    }

    canSubScript(): boolean {
        return false; // TODO: Make this check first
    }
}

export class ParcelableToken extends Expression {
    value: string;
    constructor(value: string) {
        super();
        this.value = value;
    }

    print(indent: number = 0) {
        console.log("..".repeat(indent) + this.value);
    }

    unicodify(): string {
        return ParcelableToken.allMappings[this.value] ?? this.value;
    }

    canSuperScript(): boolean {
        return false;
    }

    canSubScript(): boolean {
        return false;
    }

    static greekCharactersNormal = {
        "alpha": "α",
        "beta": "β",
        "gamma": "γ",
        "delta": "δ",
        "epsilon": "ε",
        "zeta": "ζ",
        "eta": "η",
        "theta": "θ",
        "iota": "ι",
        "kappa": "κ",
        "lambda": "λ",
        "mu": "μ",
        "nu": "ν",
        "xi": "ξ",
        "omicron": "ο",
        "pi": "π",
        "rho": "ρ",
        "sigma": "σ",
        "tau": "τ",
        "upsilon": "υ",
        "phi": "φ",
        "chi": "χ",
        "psi": "ψ",
        "omega": "ω"
    }

    static greekCharactersCapital = {
        "Alpha": "Α",
        "Beta": "Β",
        "Gamma": "Γ",
        "Delta": "Δ",
        "Epsilon": "Ε",
        "Zeta": "Ζ",
        "Eta": "Η",
        "Theta": "Θ",
        "Iota": "Ι",
        "Kappa": "Κ",
        "Lambda": "Λ",
        "Mu": "Μ",
        "Nu": "Ν",
        "Xi": "Ξ",
        "Omicron": "Ο",
        "Pi": "Π",
        "Rho": "Ρ",
        "Sigma": "Σ",
        "Tau": "Τ",
        "Upsilon": "Υ",
        "Phi": "Φ",
        "Chi": "Χ",
        "Psi": "Ψ",
        "Omega": "Ω"
    }

    static arrows = {
        "leftarrow": "←",
        "rightarrow": "→",
        "leftrightarrow": "↔",
        "uparrow": "↑",
        "downarrow": "↓",
        "Uparrow": "⇑",
        "Leftrightarrow": "⇔",
        "mapsto": "↦",
        "nearrow": "↗",
        "swarrow": "↙",
        "leftharpoonup": "↼",
        "leftharpoondown": "↽",
        "Leftarrow": "⇐",
        "Rightarrow": "⇒",
        "rightleftharpoons": "⇌",
        "Downarrow": "⇓",
        "Updownarrow": "⇕",
        "longmapsto": "⟼",
        "searrow": "↘",
        "nwarrow": "↖",
        "rightharpoonup": "⇀",
        "rightharpoondown": "⇁"
    }

    static miscellaneous = {
        "infty": "∞",
        "Re": "ℜ",
        "nabla": "∇",
        "partial": "∂",
        "emptyset": "∅",
        "wp": "℘",
        "neg": "¬",
        "square": "□",
        "blacksquare": "■",
        "forall": "∀",
        "Im": "ℑ",
        "exists": "∃",
        "nexists": "∄",
        "varnothing": "∅",
        "complement": "∁",
        "cdots": "⋯",
        "surd": "√",
        "triangle": "△"
    }

    static BinaryOperators: { [key: string]: string } = {
        "times": "×",
        "cdot": "·",
        "div": "÷",
        "cap": "∩",
        "cup": "∪",
        "neq": "≠",
        "leq": "≤",
        "geq": "≥",
        "in": "∈",
        "perpendicular": "⊥",
        "notin": "∉",
        "subset": "⊂",
        "simeq": "≃",
        "approx": "≈",
        "wedge": "∧",
        "vee": "∨",
        "oplus": "⊕",
        "otimes": "⊗",
        "equiv": "≡",
        "cong": "≅",
        "Box": "□",
        "boxtimes": "⊠"
    };

    static allMappings: { [key: string]: string } = {
        ...ParcelableToken.greekCharactersNormal,
        ...ParcelableToken.greekCharactersCapital,
        ...ParcelableToken.arrows,
        ...ParcelableToken.miscellaneous,
        ...ParcelableToken.BinaryOperators
    };

}

export class Token extends Expression {
    value: string;
    constructor(value: string) {
        super();
        this.value = value;
    }

    print(indent: number = 0) {
        console.log("..".repeat(indent) + this.value);
    }

    unicodify(): string {
        return this.value;
    }

    getSuperscript(): string {
        let result = "";
        for (const char of this.value) {
            if (char in Token.SuperScriptMap) {
                result += Token.SuperScriptMap[char];
            } else {
                result += char; // if no superscript available, keep original
            }
        }
        return result;
    }

    canSuperScript(): boolean {
        for (const char of this.value) {
            if (!(char in Token.SuperScriptMap)) {
                return false;
            }
        }
        return true;
    }

    static SuperScriptMap: { [key: string]: string } = {
        '0': '⁰',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹',

        'A': 'ᴬ',
        'B': 'ᴮ',
        'C': 'ᶜ',
        'D': 'ᴰ',
        'E': 'ᴱ',
        'F': 'ᶠ',
        'G': 'ᴳ',
        'H': 'ᴴ',
        'I': 'ᴵ',
        'J': 'ᴶ',
        'K': 'ᴷ',
        'L': 'ᴸ',
        'M': 'ᴹ',
        'N': 'ᴺ',
        'O': 'ᴼ',
        'P': 'ᴾ',
        'R': 'ᴿ',
        'S': 'ˢ',
        'T': 'ᵀ',
        'U': 'ᵁ',
        'V': 'ⱽ',
        'W': 'ᵂ',
        
        'a': 'ᵃ',
        'b': 'ᵇ',
        'c': 'ᶜ',
        'd': 'ᵈ',
        'e': 'ᵉ',
        'f': 'ᶠ',
        'g': 'ᵍ',
        'h': 'ʰ',
        'i': 'ⁱ',
        'j': 'ʲ',
        'k': 'ᵏ',
        'l': 'ˡ',
        'm': 'ᵐ',
        'n': 'ⁿ',
        'o': 'ᵒ',
        'p': 'ᵖ',
        'q': 'ᑫ',
        'r': 'ʳ',
        's': 'ˢ',
        't': 'ᵗ',
        'u': 'ᵘ',
        'v': 'ᵛ',
        'w': 'ʷ',
        'x': 'ˣ',
        'y': 'ʸ',
        'z': 'ᶻ',

    };

    canSubScript(): boolean {
        for (const char of this.value) {
            if (!(char in Token.SubScriptMap)) {
                return false;
            }
        }
        return true;
    }

    getSubscript(): string {
        let result = "";
        for (const char of this.value) {
            if (char in Token.SubScriptMap) {
                result += Token.SubScriptMap[char];
            } else {
                result += char; // if no subscript available, keep original
            }
        }
        return result;
    }

    static SubScriptMap: { [key: string]: string } = {
        '0': '₀',
        '1': '₁',
        '2': '₂',
        '3': '₃',
        '4': '₄',
        '5': '₅',
        '6': '₆',
        '7': '₇',
        '8': '₈',
        '9': '₉',
        'a': 'ₐ',
        'e': 'ₑ',
        'h': 'ₕ',
        'i': 'ᵢ',
        'j': 'ⱼ',
        'k': 'ₖ',
        'l': 'ₗ',
        'm': 'ₘ',
        'n': 'ₙ',
        'o': 'ₒ',
        'p': 'ₚ',
        'r': 'ᵣ',
        's': 'ₛ',
        't': 'ₜ',
        'u': 'ᵤ',
        'v': 'ᵥ',
        'x': 'ₓ',
    };
}