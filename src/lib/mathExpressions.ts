export abstract class Expression {
    abstract print(indent: number): void;
    abstract unicodify(): string;
    abstract canSuperScript(): boolean;
    getSuperscript(): string {
        throw new Error("getSuperscript not implemented for this expression");
    };
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
}

export class Power extends Expression {
    base: Expression
    exponent: Expression;
    constructor(base: Expression, exponent: Expression) {
        super();
        this.base = base;
        this.exponent = exponent;
    }

    print(indent: number = 0) {
        this.base.print(indent + 1);
        console.log("..".repeat(indent) + "^");
        this.exponent.print(indent + 1);
    }

    unicodify(): string {
        if (this.exponent.canSuperScript()) {
            return this.base.unicodify() + this.exponent.getSuperscript();
        } else {
            return this.base.unicodify() + "^(" + this.exponent.unicodify() + ")";
        }
    }

    getSuperscript(): string {
        return this.base.getSuperscript() + "ᣔ⁽" + this.exponent.getSuperscript() + "⁾";
    }

    canSuperScript(): boolean {
        return this.base.canSuperScript() && this.exponent.canSuperScript();
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
        return "√[" + this.degree.unicodify() + "](" + this.radicand.unicodify() + ")";
    }

    canSuperScript(): boolean {
        return false;
    }
}

export class Function extends Expression {
    functionName: string;
    parameter: Expression;

    constructor(functionName: string, parameter: Expression) {
        super();
        this.parameter = parameter;
        this.functionName = functionName;
    }

    print(indent: number = 0) {
        console.log("..".repeat(indent) + this.functionName + "(");
        this.parameter.print(indent + 1);
        console.log("..".repeat(indent) + ")");
    }

    unicodify(): string {
        return this.functionName + "(" + this.parameter.unicodify() + ")";
    }

    canSuperScript(): boolean {
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
}