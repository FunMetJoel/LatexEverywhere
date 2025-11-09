import * as MathExpr from './mathExpressions';

export function parseLatex(input: string): MathExpr.Expression {
    // return new MathExpr.Add(
    //     new MathExpr.Token("a"),
    //     new MathExpr.Fraction(
    //         new MathExpr.Token("b"),
    //         new MathExpr.Token("c")
    //     )
    // );

    const tokens = tokenize(input);
    const expression = tokenInterpreter(tokens);
    return expression;
}


function tokenize(input: string): string[] {
    // Latex tokenizer. A token can be a command (starting with \), a symbol (+, -, /, etc.), or an alphanumeric string.
    const tokens: string[] = [];
    const regex = /\\[a-zA-Z]+|[+\-*/^_=(){}]|[0-9a-zA-Z]+/g;
    let match;
    while ((match = regex.exec(input)) !== null) {
        tokens.push(match[0]);
    }
    return tokens;
}

function tokenInterpreter(tokens: string[]): MathExpr.Expression {
    
    function peek(): string | null {
        return tokens.length > 0 ? tokens[0]! : null;
    }

    function consume(): string {
        return tokens.shift()!;
    }

    function parseExpression(): MathExpr.Expression {
        let left = parseTerm();
        while (true) {
            const token = peek();
            if (token === '+' || token === '-') {
                const operant = consume();
                const right = parseTerm();
                if (operant === '+') {
                    left = new MathExpr.Add(left, right);
                } else {
                    left = new MathExpr.Subtract(left, right);
                }
            }
            else {                
                break;
            }
        }
        return left;
    }

    function parseTerm(): MathExpr.Expression {
        let left = parsePower();
        while (true) {
            const token = peek();
            if (token === '*' || token === '/') {
                const operant = consume();
                const right = parseFactor();
                if (operant === '*') {
                    left = new MathExpr.Multiply(left, right);
                }
                else {
                    left = new MathExpr.Fraction(left, right);
                }
            }
            else {
                break;
            }
        }
        return left;
    }

    function parsePower(): MathExpr.Expression {
        let base = parseFactor();
        while (true) {
            const token = peek();
            if (token === '^') {
                consume(); // consume '^'
                const exponent = parseFactor();
                base = new MathExpr.Power(base, exponent);
            }
            else {
                break;
            }
        }
        return base;
    }

    function parseFactor(): MathExpr.Expression {
        const token = consume();
        if (token === '(') {
            const expr = parseExpression();
            consume(); // consume ')'
            return expr;
        }
        else if (token === '{') {
            const expr = parseExpression();
            consume(); // consume '}'
            return expr;
        }
        else if (token === '\\frac') {
            const numerator = parseFactor();
            const denominator = parseFactor();
            return new MathExpr.Fraction(numerator, denominator);
        }
        else if (token === '\\sqrt') {
            const radicand = parseFactor();
            return new MathExpr.Function('sqrt', radicand);
        }
        else if (token.charAt(0) === '\\') {
            const funcName = token.substring(1);
            const argument = parseFactor();
            return new MathExpr.Function(funcName, argument);
        }
        else {
            return new MathExpr.Token(token);
        }
    }

    return parseExpression();
}
    
