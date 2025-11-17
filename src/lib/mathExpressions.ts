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
        if (this.numerator instanceof Token && this.denominator instanceof Token) {
            const fracKey = this.numerator.value + "/" + this.denominator.value;
            if (fracKey in Fraction.defaultFractions) {
                return Fraction.defaultFractions[fracKey] ?? "SOMETHING WENT WRONG";
            }

            if (this.numerator.canSuperScript() && this.denominator.canSubScript()) {
                return this.numerator.getSuperscript() + '⁄' + this.denominator.getSubscript();
            }
        }

        return "(" + this.numerator.unicodify() + ")/(" + this.denominator.unicodify() + ")";
    }

    canSuperScript(): boolean {
        return false;
    }

    canSubScript(): boolean {
        return false;
    }

    static defaultFractions: { [key: string]: string } = {
        "1/2": "½",
        "1/3": "⅓",
        "2/3": "⅔",
        "1/4": "¼",
        "3/4": "¾",
        "1/5": "⅕",
        "2/5": "⅖",
        "3/5": "⅗",
        "4/5": "⅘",
        "1/6": "⅙",
        "5/6": "⅚",
        "1/8": "⅛",
        "3/8": "⅜",
        "5/8": "⅝",
        "7/8": "⅞"
    };
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

export class BlockBracketedExpression extends Expression {
    expression: Expression;
    constructor(expression: Expression) {
        super();
        this.expression = expression;
    }
    
    print(indent: number = 0) {
        console.log("..".repeat(indent) + "[");
        this.expression.print(indent + 1);
        console.log("..".repeat(indent) + "]");
    }

    unicodify(): string {
        return "[" + this.expression.unicodify() + "]";
    }

    canSuperScript(): boolean {
        return false;
    }

    canSubScript(): boolean {
        return false;
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

    static greekCharactersNormal: { [key: string]: string } = {
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

    static greekCharactersCapital: { [key: string]: string } = {
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

    static arrows: { [key: string]: string } = {
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

    static miscellaneous: { [key: string]: string } = {
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

    static LogicalOperators: { [key: string]: string } = {
        // Existing
        "land": "∧",
        "lor": "∨",
        "lnot": "¬",
        "iff": "⇔",
        "implies": "⇒",
        "therefore": "∴",

        // Additional logical connectives
        "nand": "⊼",
        "nor": "⊽",
        "xor": "⊕",
        "xnor": "⊙",

        // Quantifiers
        "forall": "∀",
        "exists": "∃",
        "notexists": "∄",

        // Set operators
        "subset": "⊂",
        "subseteq": "⊆",
        "supset": "⊃",
        "supseteq": "⊇",
        "in": "∈",
        "notin": "∉",
        "union": "∪",
        "intersection": "∩",
        "setminus": "∖",

        // Equality & comparison
        "neq": "≠",
        "approx": "≈",
        "equiv": "≡",
        "leq": "≤",
        "geq": "≥",

        // Modal logic
        "necessarily": "□",
        "possibly": "◇",

        // Misc useful symbols
        "because": "∵",
        "proves": "⊢",
        "models": "⊨",
        "turnstile": "⊢",
        "doubleturnstile": "⊨",
        "vdash": "⊢",
        "dashv": "⊣",
    };


    static allMappings: { [key: string]: string } = {
        ...ParcelableToken.greekCharactersNormal,
        ...ParcelableToken.greekCharactersCapital,
        ...ParcelableToken.arrows,
        ...ParcelableToken.miscellaneous,
        ...ParcelableToken.BinaryOperators,
        ...ParcelableToken.LogicalOperators
    };

}

export class SpecialMathFontToken extends Expression {
    value: string;
    fontType: string;

    constructor(value: Expression, fontType: string) {
        super();
        this.value = value.unicodify();
        this.fontType = fontType;
    }

    print(indent: number = 0) {
        console.log("..".repeat(indent) + this.fontType + "(" + this.value + ")");
    }
    unicodify(): string {
        let mapping: { [key: string]: string } = {};
        switch (this.fontType) {
            case "\\mathbb":
                mapping = SpecialMathFontToken.MathBBMap;
                break;
            case "\\mathcal":
                mapping = SpecialMathFontToken.MathScriptMap;
                break;
            case "\\mathbf":
                mapping = SpecialMathFontToken.MathBoldMap;
                break;
            case "\\mathfrak":
                mapping = SpecialMathFontToken.MathFrakturMap;
                break;
            case "\\mathsf":
                mapping = SpecialMathFontToken.MathSansMap;
                break;
            case "\\mathtt":
                mapping = SpecialMathFontToken.MathMonospaceMap;
                break;
            default:
                return this.value; // Unsupported font type
        }

        let result = "";
        for (const char of this.value) {
            result += mapping[char] ?? char;
        }
        return result;
    }

    canSuperScript(): boolean {
        return false;
    }

    canSubScript(): boolean {
        return false;
    }


    static MathBBMap: { [key: string]: string } = {
        // Uppercase (all exist)
        'A': '𝔸',
        'B': '𝔹',
        'C': 'ℂ',
        'D': '𝔻',
        'E': '𝔼',
        'F': '𝔽',
        'G': '𝔾',
        'H': 'ℍ',
        'I': '𝕀',
        'J': '𝕁',
        'K': '𝕂',
        'L': '𝕃',
        'M': '𝕄',
        'N': 'ℕ',
        'O': '𝕆',
        'P': 'ℙ',
        'Q': 'ℚ',
        'R': 'ℝ',
        'S': '𝕊',
        'T': '𝕋',
        'U': '𝕌',
        'V': '𝕍',
        'W': '𝕎',
        'X': '𝕏',
        'Y': '𝕐',
        'Z': 'ℤ',

        // Lowercase (only these exist)
        'a': '𝕒',
        'b': '𝕓',
        'c': '𝕔',
        'd': '𝕕',
        'e': '𝕖',
        'f': '𝕗',
        'g': '𝕘',
        'h': '𝕙',
        'i': '𝕚',
        'j': '𝕛',
        'k': '𝕜',
        'l': '𝕝',
        'm': '𝕞',
        'n': '𝕟',
        'o': '𝕠',
        'p': '𝕡',
        'q': '𝕢',
        'r': '𝕣',
        's': '𝕤',
        't': '𝕥',
        'u': '𝕦',
        'v': '𝕧',
        'w': '𝕨',
        'x': '𝕩',
        'y': '𝕪',
        'z': '𝕫',

        // Numbers
        '0': '𝟘',
        '1': '𝟙',
        '2': '𝟚',
        '3': '𝟛',
        '4': '𝟜',
        '5': '𝟝',
        '6': '𝟞',
        '7': '𝟟',
        '8': '𝟠',
        '9': '𝟡'
    };

    static MathBoldMap: { [key: string]: string } = {
        // Uppercase A–Z
        'A':'𝐀','B':'𝐁','C':'𝐂','D':'𝐃','E':'𝐄','F':'𝐅','G':'𝐆','H':'𝐇','I':'𝐈','J':'𝐉',
        'K':'𝐊','L':'𝐋','M':'𝐌','N':'𝐍','O':'𝐎','P':'𝐏','Q':'𝐐','R':'𝐑','S':'𝐒','T':'𝐓',
        'U':'𝐔','V':'𝐕','W':'𝐖','X':'𝐗','Y':'𝐘','Z':'𝐙',

        // Lowercase a–z
        'a':'𝐚','b':'𝐛','c':'𝐜','d':'𝐝','e':'𝐞','f':'𝐟','g':'𝐠','h':'𝐡','i':'𝐢','j':'𝐣',
        'k':'𝐤','l':'𝐥','m':'𝐦','n':'𝐧','o':'𝐨','p':'𝐩','q':'𝐪','r':'𝐫','s':'𝐬','t':'𝐭',
        'u':'𝐮','v':'𝐯','w':'𝐰','x':'𝐱','y':'𝐲','z':'𝐳',

        // Digits 0–9
        '0':'𝟎','1':'𝟏','2':'𝟐','3':'𝟑','4':'𝟒',
        '5':'𝟓','6':'𝟔','7':'𝟕','8':'𝟖','9':'𝟗'
    };

    static MathItalicMap: { [key: string]: string } = {
        // Uppercase
        'A':'𝐴','B':'𝐵','C':'𝐶','D':'𝐷','E':'𝐸','F':'𝐹','G':'𝐺','H':'𝐻','I':'𝐼','J':'𝐽',
        'K':'𝐾','L':'𝐿','M':'𝑀','N':'𝑁','O':'𝑂','P':'𝑃','Q':'𝑄','R':'𝑅','S':'𝑆','T':'𝑇',
        'U':'𝑈','V':'𝑉','W':'𝑊','X':'𝑋','Y':'𝑌','Z':'𝑍',

        // Lowercase
        'a':'𝑎','b':'𝑏','c':'𝑐','d':'𝑑','e':'𝑒','f':'𝑓','g':'𝑔','h':'ℎ','i':'𝑖','j':'𝑗',
        'k':'𝑘','l':'𝑙','m':'𝑚','n':'𝑛','o':'𝑜','p':'𝑝','q':'𝑞','r':'𝑟','s':'𝑠','t':'𝑡',
        'u':'𝑢','v':'𝑣','w':'𝑤','x':'𝑥','y':'𝑦','z':'𝑧'
    };

    static MathBoldItalicMap: { [key: string]: string } = {
        'A':'𝑨','B':'𝑩','C':'𝑪','D':'𝑫','E':'𝑬','F':'𝑭','G':'𝑮','H':'𝑯','I':'𝑰','J':'𝑱',
        'K':'𝑲','L':'𝑳','M':'𝑴','N':'𝑵','O':'𝑶','P':'𝑷','Q':'𝑸','R':'𝑹','S':'𝑺','T':'𝑻',
        'U':'𝑼','V':'𝑽','W':'𝑾','X':'𝑿','Y':'𝒀','Z':'𝒁',

        'a':'𝒂','b':'𝒃','c':'𝒄','d':'𝒅','e':'𝒆','f':'𝒇','g':'𝒈','h':'𝒉','i':'𝒊','j':'𝒋',
        'k':'𝒌','l':'𝒍','m':'𝒎','n':'𝒏','o':'𝒐','p':'𝒑','q':'𝒒','r':'𝒓','s':'𝒔','t':'𝒕',
        'u':'𝒖','v':'𝒗','w':'𝒘','x':'𝒙','y':'𝒚','z':'𝒛'
    };

    static MathScriptMap: { [key: string]: string } = {
        // Uppercase A–Z
        'A':'𝒜','B':'ℬ','C':'𝒞','D':'𝒟','E':'ℰ','F':'ℱ','G':'𝒢','H':'ℋ','I':'ℐ','J':'𝒥',
        'K':'𝒦','L':'ℒ','M':'ℳ','N':'𝒩','O':'𝒪','P':'𝒫','Q':'𝒬','R':'ℛ','S':'𝒮','T':'𝒯',
        'U':'𝒰','V':'𝒱','W':'𝒲','X':'𝒳','Y':'𝒴','Z':'𝒵',

        // Lowercase (VERY limited set exists)
        'a':'𝒶','b':'𝒷','c':'𝒸','d':'𝒹','e':'ℯ','f':'𝒻','g':'ℊ','h':'𝒽','i':'𝒾','j':'𝒿',
        'k':'𝓀','l':'𝓁','m':'𝓂','n':'𝓃','o':'ℴ','p':'𝓅','q':'𝓆','r':'𝓇','s':'𝓈','t':'𝓉',
        'u':'𝓊','v':'𝓋','w':'𝓌','x':'𝓍','y':'𝓎','z':'𝓏'
    };

    static MathScriptBoldMap: { [key: string]: string } = {
        'A':'𝓐','B':'𝓑','C':'𝓒','D':'𝓓','E':'𝓔','F':'𝓕','G':'𝓖','H':'𝓗','I':'𝓘','J':'𝓙',
        'K':'𝓚','L':'𝓛','M':'𝓜','N':'𝓝','O':'𝓞','P':'𝓟','Q':'𝓠','R':'𝓡','S':'𝓢','T':'𝓣',
        'U':'𝓤','V':'𝓥','W':'𝓦','X':'𝓧','Y':'𝓨','Z':'𝓩',

        'a':'𝓪','b':'𝓫','c':'𝓬','d':'𝓭','e':'𝓮','f':'𝓯','g':'𝓰','h':'𝓱','i':'𝓲','j':'𝓳',
        'k':'𝓴','l':'𝓵','m':'𝓶','n':'𝓷','o':'𝓸','p':'𝓹','q':'𝓺','r':'𝓻','s':'𝓼','t':'𝓽',
        'u':'𝓾','v':'𝓿','w':'𝔀','x':'𝔁','y':'𝔂','z':'𝔃'
    };

    static MathFrakturMap: { [key: string]: string } = {
        'A':'𝔄','B':'𝔅','C':'ℭ','D':'𝔇','E':'𝔈','F':'𝔉','G':'𝔊','H':'ℌ','I':'ℑ','J':'𝔍',
        'K':'𝔎','L':'𝔏','M':'𝔐','N':'𝔑','O':'𝔒','P':'𝔓','Q':'𝔔','R':'ℜ','S':'𝔖','T':'𝔗',
        'U':'𝔘','V':'𝔙','W':'𝔚','X':'𝔛','Y':'𝔜','Z':'ℨ',

        'a':'𝔞','b':'𝔟','c':'𝔠','d':'𝔡','e':'𝔢','f':'𝔣','g':'𝔤','h':'𝔥','i':'𝔦','j':'𝔧',
        'k':'𝔨','l':'𝔩','m':'𝔪','n':'𝔫','o':'𝔬','p':'𝔭','q':'𝔮','r':'𝔯','s':'𝔰','t':'𝔱',
        'u':'𝔲','v':'𝔳','w':'𝔴','x':'𝔵','y':'𝔶','z':'𝔷'
    };

    static MathFrakturBoldMap: { [key: string]: string } = {
        'A':'𝕬','B':'𝕭','C':'𝕮','D':'𝕯','E':'𝕰','F':'𝕱','G':'𝕲','H':'𝕳','I':'𝕴','J':'𝕵',
        'K':'𝕶','L':'𝕷','M':'𝕸','N':'𝕹','O':'𝕺','P':'𝕻','Q':'𝕼','R':'𝕽','S':'𝕾','T':'𝕿',
        'U':'𝖀','V':'𝖁','W':'𝖂','X':'𝖃','Y':'𝖄','Z':'𝖅',

        'a':'𝖆','b':'𝖇','c':'𝖈','d':'𝖉','e':'𝖊','f':'𝖋','g':'𝖌','h':'𝖍','i':'𝖎','j':'𝖏',
        'k':'𝖐','l':'𝖑','m':'𝖒','n':'𝖓','o':'𝖔','p':'𝖕','q':'𝖖','r':'𝖗','s':'𝖘','t':'𝖙',
        'u':'𝖚','v':'𝖛','w':'𝖜','x':'𝖝','y':'𝖞','z':'𝖟'
    };

    static MathSansMap: { [key: string]: string } = {
        // Uppercase
        'A':'𝖠','B':'𝖡','C':'𝖢','D':'𝖣','E':'𝖤','F':'𝖥','G':'𝖦','H':'𝖧','I':'𝖨','J':'𝖩',
        'K':'𝖪','L':'𝖫','M':'𝖬','N':'𝖭','O':'𝖮','P':'𝖯','Q':'𝖰','R':'𝖱','S':'𝖲','T':'𝖳',
        'U':'𝖴','V':'𝖵','W':'𝖶','X':'𝖷','Y':'𝖸','Z':'𝖹',

        // Lowercase
        'a':'𝖺','b':'𝖻','c':'𝖼','d':'𝖽','e':'𝖾','f':'𝖿','g':'𝗀','h':'𝗁','i':'𝗂','j':'𝗃',
        'k':'𝗄','l':'𝗅','m':'𝗆','n':'𝗇','o':'𝗈','p':'𝗉','q':'𝗊','r':'𝗋','s':'𝗌','t':'𝗍',
        'u':'𝗎','v':'𝗏','w':'𝗐','x':'𝗑','y':'𝗒','z':'𝗓',

        // Digits
        '0':'𝟢','1':'𝟣','2':'𝟤','3':'𝟥','4':'𝟦',
        '5':'𝟧','6':'𝟨','7':'𝟩','8':'𝟪','9':'𝟫'
    };

    static MathSansBoldMap: { [key: string]: string } = {
        // Uppercase
        'A':'𝗔','B':'𝗕','C':'𝗖','D':'𝗗','E':'𝗘','F':'𝗙','G':'𝗚','H':'𝗛','I':'𝗜','J':'𝗝',
        'K':'𝗞','L':'𝗟','M':'𝗠','N':'𝗡','O':'𝗢','P':'𝗣','Q':'𝗤','R':'𝗥','S':'𝗦','T':'𝗧',
        'U':'𝗨','V':'𝗩','W':'𝗪','X':'𝗫','Y':'𝗬','Z':'𝗭',

        // Lowercase
        'a':'𝗮','b':'𝗯','c':'𝗰','d':'𝗱','e':'𝗲','f':'𝗳','g':'𝗴','h':'𝗵','i':'𝗶','j':'𝗷',
        'k':'𝗸','l':'𝗹','m':'𝗺','n':'𝗻','o':'𝗼','p':'𝗽','q':'𝗾','r':'𝗿','s':'𝘀','t':'𝘁',
        'u':'𝘂','v':'𝘃','w':'𝘄','x':'𝘅','y':'𝘆','z':'𝘇',

        // Digits
        '0':'𝟬','1':'𝟭','2':'𝟮','3':'𝟯','4':'𝟰',
        '5':'𝟱','6':'𝟲','7':'𝟳','8':'𝟴','9':'𝟵'
    };

    static MathSansItalicMap: { [key: string]: string } = {
        'A':'𝘈','B':'𝘉','C':'𝘊','D':'𝘋','E':'𝘌','F':'𝘍','G':'𝘎','H':'𝘏','I':'𝘐','J':'𝘑',
        'K':'𝘒','L':'𝘓','M':'𝘔','N':'𝘕','O':'𝘖','P':'𝘗','Q':'𝘘','R':'𝘙','S':'𝘚','T':'𝘛',
        'U':'𝘜','V':'𝘝','W':'𝘞','X':'𝘟','Y':'𝘠','Z':'𝘡',

        'a':'𝘢','b':'𝘣','c':'𝘤','d':'𝘥','e':'𝘦','f':'𝘧','g':'𝘨','h':'𝘩','i':'𝘪','j':'𝘫',
        'k':'𝘬','l':'𝘭','m':'𝘮','n':'𝘯','o':'𝘰','p':'𝘱','q':'𝘲','r':'𝘳','s':'𝘴','t':'𝘵',
        'u':'𝘶','v':'𝘷','w':'𝘸','x':'𝘹','y':'𝘺','z':'𝘻'
    };

    static MathSansBoldItalicMap: { [key: string]: string } = {
        'A':'𝘼','B':'𝘽','C':'𝘾','D':'𝘿','E':'𝙀','F':'𝙁','G':'𝙂','H':'𝙃','I':'𝙄','J':'𝙅',
        'K':'𝙆','L':'𝙇','M':'𝙈','N':'𝙉','O':'𝙊','P':'𝙋','Q':'𝙌','R':'𝙍','S':'𝙎','T':'𝙏',
        'U':'𝙐','V':'𝙑','W':'𝙒','X':'𝙓','Y':'𝙔','Z':'𝙕',

        'a':'𝙖','b':'𝙗','c':'𝙘','d':'𝙙','e':'𝙚','f':'𝙛','g':'𝙜','h':'𝙝','i':'𝙞','j':'𝙟',
        'k':'𝙠','l':'𝙡','m':'𝙢','n':'𝙣','o':'𝙤','p':'𝙥','q':'𝙦','r':'𝙧','s':'𝙨','t':'𝙩',
        'u':'𝙪','v':'𝙫','w':'𝙨','x':'𝙭','y':'𝙮','z':'𝙯'
    };

    static MathMonospaceMap: { [key: string]: string } = {
        // Uppercase
        'A':'𝙰','B':'𝙱','C':'𝙲','D':'𝙳','E':'𝙴','F':'𝙵','G':'𝙶','H':'𝙷','I':'𝙸','J':'𝙹',
        'K':'𝙺','L':'𝙻','M':'𝙼','N':'𝙽','O':'𝙾','P':'𝙿','Q':'𝚀','R':'𝚁','S':'𝚂','T':'𝚃',
        'U':'𝚄','V':'𝚅','W':'𝚆','X':'𝚇','Y':'𝚈','Z':'𝚉',

        // Lowercase
        'a':'𝚊','b':'𝚋','c':'𝚌','d':'𝚍','e':'𝚎','f':'𝚏','g':'𝚐','h':'𝚑','i':'𝚒','j':'𝚓',
        'k':'𝚔','l':'𝚕','m':'𝚖','n':'𝚗','o':'𝚘','p':'𝚙','q':'𝚚','r':'𝚛','s':'𝚜','t':'𝚝',
        'u':'𝚞','v':'𝚟','w':'𝚠','x':'𝚡','y':'𝚢','z':'𝚣',

        // Digits
        '0':'𝟶','1':'𝟷','2':'𝟸','3':'𝟹','4':'𝟺',
        '5':'𝟻','6':'𝟼','7':'𝟽','8':'𝟾','9':'𝟿'
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