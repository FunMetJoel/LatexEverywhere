import * as MathExpr from './mathExpressions';

export function parseLatex(input: string): MathExpr.Expression {
    const tokens = tokenize(input);
    const expression = tokenInterpreter(tokens);
    return expression;
}

export function unicodify(input: string): string {
    const expression = parseLatex(input);
    return expression.unicodify();
}


function tokenize(input: string): string[] {
    // Latex tokenizer. A token can be a command (starting with \), a symbol (+, -, /, etc.), or an alphanumeric string.
    const tokens: string[] = [];
    const regex = /\\[a-zA-Z]+|[+\-*/^_=(){}[\]]|[0-9a-zA-Z]+/g;

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
        let left = parseFactor();
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
            else if (token !== null && !['+', '-', ')', '}', ']'].includes(token)) {
                const right = parseFactor();
                left = new MathExpr.ConsecutiveExpression(left, right);
            }
            else {
                break;
            }
        }
        return left;
    }

    function parseFactor(): MathExpr.Expression {
        const token = consume();
        if (token === '(') {
            const expr = parseExpression();
            consume(); // consume ')'
            return new MathExpr.BracketedExpression(expr);
        }
        else if (token === '{') {
            const expr = parseExpression();
            consume(); // consume '}'
            return expr;
        }
        else if (token === '[') {
            const expr = parseExpression();
            consume(); // consume ']'
            return expr;
        }
        else if (token === '^') {
            const exponent = parseFactor();
            return new MathExpr.Superscript(exponent);
        }
        else if (token === "_") {
            const subscript = parseFactor();
            return new MathExpr.Subscript(subscript);
        }
        else if (token === '\\frac') {
            const numerator = parseFactor();
            const denominator = parseFactor();
            return new MathExpr.Fraction(numerator, denominator);
        }
        else if (token === '\\sqrt') {
            if (peek() === '[') {
                const power = parseFactor(); // parse the optional power
                const radicand = parseFactor();
                return new MathExpr.Root(
                    power,
                    radicand
                )
            } else {
                const radicand = parseFactor();
                return new MathExpr.SquareRoot(radicand);
            }
        }
        else if (token.charAt(0) === '\\') {
            const tokenName = token.substring(1);
            return new MathExpr.ParcelableToken(tokenName);
        }
        else {
            return new MathExpr.Token(token);
        }
    }

    return parseExpression();
}
    
