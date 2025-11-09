export abstract class Expression {
    abstract print(indent: number): void;
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
}