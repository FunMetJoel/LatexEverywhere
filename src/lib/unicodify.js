
const superscriptMap = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹'
};
const subscriptMap = {
    '0': '₀',
    '1': '₁',
    '2': '₂',
    '3': '₃',
    '4': '₄',
    '5': '₅',
    '6': '₆',
    '7': '₇',
    '8': '₈',
    '9': '₉'
};

export function unicodify(latex) {
    let result = latex;

    // First replace known LaTeX commands with their Unicode equivalents
    result = replaceCaractersWithUnicode(result);
    result = replaceFractions(result);
    result = replaceRoots(result);
    result = replaceSuperscripts(result);
    result = replaceSubscripts(result);
    result = overline(result);
    result = underline(result);
    result = simpleFunctions(result);
    result = mathFont(result);

    return result;
}

function replaceCaractersWithUnicode(latex) {
    const greekLetters = {
        // Lowercase Greek
        '\\alpha': 'α',
        '\\beta': 'β',
        '\\gamma': 'γ',
        '\\delta': 'δ',
        '\\epsilon': 'ε',
        '\\zeta': 'ζ',
        '\\eta': 'η',
        '\\theta': 'θ',
        '\\iota': 'ι',
        '\\kappa': 'κ',
        '\\lambda': 'λ',
        '\\mu': 'μ',
        '\\nu': 'ν',
        '\\xi': 'ξ',
        '\\omicron': 'ο',
        '\\pi': 'π',
        '\\rho': 'ρ',
        '\\sigma': 'σ',
        '\\tau': 'τ',
        '\\upsilon': 'υ',
        '\\phi': 'φ',
        '\\chi': 'χ',
        '\\psi': 'ψ',
        '\\omega': 'ω',

        // Variants
        '\\varepsilon': 'ϵ',
        '\\vartheta': 'ϑ',
        '\\varpi': 'ϖ',
        '\\varrho': 'ϱ',
        '\\varsigma': 'ς',
        '\\varphi': 'ϕ',

        // Uppercase Greek
        '\\Gamma': 'Γ',
        '\\Delta': 'Δ',
        '\\Theta': 'Θ',
        '\\Lambda': 'Λ',
        '\\Xi': 'Ξ',
        '\\Pi': 'Π',
        '\\Sigma': 'Σ',
        '\\Upsilon': 'Υ',
        '\\Phi': 'Φ',
        '\\Chi': 'Χ',
        '\\Psi': 'Ψ',
        '\\Omega': 'Ω',
    };

    const binaryCaracters = {
        '\\ast': '∗',
        '\\pm': '±',
        '\\cap': '∩',
        '\\lhd': '◁',
        '\\star': '⋆',
        '\\mp': '∓',
        '\\cup': '∪',
        '\\rhd': '▷',
        '\\cdot': '·',
        '\\amalg': '⨿',
        '\\uplus': '⊎',
        '\\triangleleft': '◁',
        '\\circ': '∘',
        '\\odot': '⊙',
        '\\sqcap': '⊓',
        '\\triangleright': '▷',
        '\\bullet': '•',
        '\\ominus': '⊖',
        '\\sqcup': '⊔',
        '\\unlhd': '⊴',
        '\\bigcirc': '⃝',
        '\\oplus': '⊕',
        '\\wedge': '∧',
        '\\unrhd': '⊵',
        '\\diamond': '⋄',
        '\\oslash': '⊘',
        '\\vee': '∨',
        '\\bigtriangledown': '▽',
        '\\times': '×',
        '\\otimes': '⊗',
        '\\dagger': '†',
        '\\bigtriangleup': '△',
        '\\div': '÷',
        '\\wr': '≀',
        '\\ddagger': '‡',
        '\\setminus': '\\',
        '\\centerdot': '·',
        '\\Box': '□',
        '\\barwedge': '⊼',
        '\\veebar': '⊻',
        '\\circledast': '⊛',
        '\\boxplus': '⊞',
        '\\curlywedge': '⋏',
        '\\curlyvee': '⋎',
        '\\circledcirc': '⊚',
        '\\boxminus': '⊟',
        '\\Cap': '⋒',
        '\\Cup': '⋓',
        '\\circleddash': '⊖',
        '\\boxtimes': '⊠',
        '\\bot': '⊥',
        '\\top': '⊤',
        '\\dotplus': '∔',
        '\\boxdot': '⊡',
        '\\intercal': '⊺',
        '\\rightthreetimes': '⋌',
        '\\divideontimes': '⋇',
        '\\square': '□',
        '\\doublebarwedge': '⩞',
        '\\leftthreetimes': '⋋',
        '\\equiv': '≡',
        '\\leq': '≤',
        '\\geq': '≥',
        '\\perp': '⊥',
        '\\cong': '≅',
        '\\prec': '≺',
        '\\succ': '≻',
        '\\mid': '|',
        '\\neq': '≠',
        '\\preceq': '⪯',
        '\\succeq': '⪰',
        '\\parallel': '∥',
        '\\sim': '∼',
        '\\ll': '≪',
        '\\gg': '≫',
        '\\bowtie': '⋈',
        '\\simeq': '≃',
        '\\subset': '⊂',
        '\\supset': '⊃',
        '\\Join': '⋊⋉',
        '\\approx': '≈',
        '\\subseteq': '⊆',
        '\\supseteq': '⊇',
        '\\ltimes': '⋉',
        '\\asymp': '≍',
        '\\sqsubset': '⊏',
        '\\sqsupset': '⊐',
        '\\rtimes': '⋊',
        '\\doteq': '≐',
        '\\sqsubseteq': '⊑',
        '\\sqsupseteq': '⊒',
        '\\smile': '⌣',
        '\\propto': '∝',
        '\\dashv': '⊣',
        '\\vdash': '⊢',
        '\\frown': '⌢',
        '\\models': '|=',
        '\\in': '∈',
        '\\ni': '∋',
        '\\notin': '∉',
        '\\approxeq': '≊',
        '\\leqq': '≦',
        '\\geqq': '≧',
        '\\lessgtr': '≶',
        '\\thicksim': '∼',
        '\\leqslant': '⩽',
        '\\geqslant': '⩾',
        '\\lesseqgtr': '⋚',
        '\\backsim': '∽',
        '\\lessapprox': '⪅',
        '\\gtrapprox': '⪆',
        '\\lesseqqgtr': '⪋',
        '\\backsimeq': '⋍',
        '\\lll': '≪',
        '\\ggg': '≫',
        '\\gtreqqless': '⪌',
        '\\triangleq': '≜',
        '\\lessdot': '⋖',
        '\\gtrdot': '⋗',
        '\\gtreqless': '⋛',
        '\\circeq': '⊜',
        '\\lesssim': '≲',
        '\\gtrsim': '≳',
        '\\gtrless': '≷',
        '\\bumpeq': '≏',
        '\\eqslantless': '⪕',
        '\\eqslantgtr': '⪖',
        '\\backepsilon': '϶',
        '\\Bumpeq': '≎',
        '\\precsim': '≾',
        '\\succsim': '≿',
        '\\between': '≬',
        '\\doteqdot': '≑',
        '\\precapprox': '≾',
        '\\succapprox': '≿',
        '\\pitchfork': '⋔',
        '\\thickapprox': '≈',
        '\\Subset': '⋐',
        '\\Supset': '⋑',
        '\\shortmid': '∣',
        '\\fallingdotseq': '≒',
        '\\subseteqq': '⫅',
        '\\supseteqq': '⫆',
        '\\smallfrown': '⌢',
        '\\risingdotseq': '≓',
        '\\smallsmile': '⌣',
        '\\varpropto': '∝',
        '\\preccurlyeq': '≼',
        '\\succcurlyeq': '≽',
        '\\Vdash': '⊩',
        '\\therefore': '∴',
        '\\curlyeqprec': '⋞',
        '\\curlyeqsucc': '⋟',
        '\\vDash': '⊨',
        '\\because': '∵',
        '\\blacktriangleleft': '◀',
        '\\blacktriangleright': '▶',
        '\\Vvdash': '⊪',
        '\\eqcirc': '≖',
        '\\trianglelefteq': '⊴',
        '\\trianglerighteq': '⊵',
        '\\vartriangleleft': '◁',
        '\\vartriangleright': '▷',
        '\\nshortparallel': '∦',
        '\\ncong': '≇',
        '\\nleq': '≰',
        '\\ngeq': '≱',
        '\\nsubseteq': '⊈',
        '\\nmid': '∤',
        '\\nleqq': '≰',
        '\\ngeqq': '≱',
        '\\nsupseteq': '⊉',
        '\\nparallel': '∦',
        '\\nleqslant': '≰',
        '\\ngeqslant': '≱',
        '\\nsubseteqq': '⊈',
        '\\nshortmid': '∤',
        '\\nless': '≮',
        '\\ngtr': '≯',
        '\\nsupseteqq': '⊉',
        '\\nprec': '⊀',
        '\\nsucc': '⊁',
        '\\subsetneq': '⊊',
        '\\nsim': '≁',
        '\\npreceq': '⋠',
        '\\nsucceq': '⋡',
        '\\supsetneq': '⊋',
        '\\nVDash': '⊯',
        '\\precnapprox': '⪹',
        '\\succnapprox': '⪺',
        '\\subsetneqq': '⫋',
        '\\nvDash': '⊭',
        '\\precnsim': '⋨',
        '\\succnsim': '⋩',
        '\\supsetneqq': '⫌',
        '\\nvdash': '⊬',
        '\\lnapprox': '⪉',
        '\\gnapprox': '⪊',
        '\\varsubsetneq': '⊊',
        '\\ntriangleleft': '⋪',
        '\\lneq': '⪇',
        '\\gneq': '⪈',
        '\\varsupsetneq': '⊋',
        '\\ntrianglelefteq': '⋬',
        '\\lneqq': '≨',
        '\\gneqq': '≩',
        '\\varsubsetneqq': '⫋',
        '\\ntriangleright': '⋫',
        '\\lnsim': '⋦',
        '\\gnsim': '⋧',
        '\\varsupsetneqq': '⫌',
        '\\ntrianglerighteq': '⋭',
        '\\lvertneqq': '≨',
        '\\gvertneqq': '≩',
    };

    const setCharacters = {
        '\\emptyset': '∅',
        '\\varnothing': '∅',
        '\\infty': '∞',
        '\\aleph': 'ℵ',
        '\\hbar': 'ℏ',
        '\\nabla': '∇',
        '\\partial': '∂',
        '\\imath': 'ı',
        '\\jmath': 'ȷ',
        '\\ell': 'ℓ',
        '\\Re': 'ℜ',
        '\\Im': 'ℑ',
        '\\wp': '℘',
        '\\mho': '℧',
        '\\bot': '⊥',
        '\\top': '⊤',
        '\\forall': '∀',
        '\\exists': '∃',
        '\\neg': '¬',
    };

    const replacements = {
        ...greekLetters,
        ...binaryCaracters,
        ...setCharacters
    };

    return latex.replace(/\\[a-zA-Z]+/g, match => replacements[match] || match);
}

function replaceFractions(latex) {
    let result = latex;

    const unicodeFractions = {
        '\\frac{1}{2}': '½',
        '\\frac{1}{3}': '⅓',
        '\\frac{2}{3}': '⅔',
        '\\frac{1}{4}': '¼',
        '\\frac{3}{4}': '¾',
        '\\frac{1}{5}': '⅕',
        '\\frac{2}{5}': '⅖',
        '\\frac{3}{5}': '⅗',
        '\\frac{4}{5}': '⅘',
        '\\frac{1}{6}': '⅙',
        '\\frac{5}{6}': '⅚',
        '\\frac{1}{7}': '⅐',
        '\\frac{1}{8}': '⅛',
        '\\frac{3}{8}': '⅜',
        '\\frac{5}{8}': '⅝',
        '\\frac{7}{8}': '⅞',
        '\\frac{1}{9}': '⅑',
        '\\frac{1}{10}': '⅒'
    };

    

    // Replace simple Unicode fractions first
    result = result.replace(/\\(?:tfrac|dfrac|frac)\{(\d+)\}\{(\d+)\}/g, (match, p1, p2) => {
        const key = `\\frac{${p1}}{${p2}}`;
        return unicodeFractions[key] || match;
    });

    // Replace other simple fractions with superscript / subscript
    result = result.replace(/\\(?:tfrac|dfrac|frac)\{(\d+)\}\{(\d+)\}/g, (match, p1, p2) => {
        const superscript = p1.split('').map(char => superscriptMap[char] || char).join('');
        const subscript = p2.split('').map(char => subscriptMap[char] || char).join('');
        return superscript + '⁄' + subscript;
    });

    // Handle complex fractions
    // \frac{a+b}{c+d} -> (a+b)/(c+d)
    result = result.replace(/\\(?:tfrac|dfrac|frac)\{([^{}]+)\}\{([^{}]+)\}/g, (match, p1, p2) => {
        return `(${p1})/(${p2})`;
    });

    return result;
}

function replaceRoots(latex) {
    let result = latex;

    // find instances of \sqrt[n]{expression} or \sqrt{expression}
    result = result.replace(/\\sqrt(?:\[(\d+)\])?\{([^{}]+)\}/g, (match, index, expr) => {
        if (index) {
            // nth root
            return `ⁿ√(${expr})`.replace('ⁿ', index.split('').map(char => superscriptMap[char] || char).join(''));
        } else {
            // square root
            return `√(${expr})`;
        }
    });
    return result;
}

function replaceSuperscripts(latex) {
    // Replace ^{...} with corresponding Unicode superscripts if possible, otherwise replace { } with ^( )
    return latex.replace(/\^(\{([^}]+)\}|([^\s^_{}]))/g, (match, p1, p2, p3) => {
        const content = p2 || p3;
        if (p2) {
            // content is within { }
            const onlyNumbers = /^[0-9]+$/.test(content);
            if (!onlyNumbers) {
                return `^(${content})`;
            }
            const unicodeSup = content.split('').map(char => superscriptMap[char] || char).join('');
            return unicodeSup !== content ? unicodeSup : `^(${content})`;
        } else {
            // single character
            return superscriptMap[content] || content;
        }
    });
}

function replaceSubscripts(latex) {
    // Replace _{...} with corresponding Unicode subscripts if possible, otherwise replace { } with _( )
    return latex.replace(/_(\{([^}]+)\}|([^\s^_{}]))/g, (match, p1, p2, p3) => {
        const content = p2 || p3;
        if (p2) {
            // content is within { }
            const onlyNumbers = /^[0-9]+$/.test(content);
            if (!onlyNumbers) {
                return `_${content}`;
            }
            const unicodeSub = content.split('').map(char => subscriptMap[char] || char).join('');
            return unicodeSub !== content ? unicodeSub : `_(${content})`;
        } else {
            // single character
            return subscriptMap[content] || content;
        }
    });
}

function overline(latex) {
    // When \overline{...} is found, replace it with the content followed by a combining overline
    return latex.replace(/\\overline\{([^}]+)\}/g, (match, p1) => {
        return p1.split('').map(char => char + '\u0305').join('');
    });
}

function underline(latex) {
    // When \underline{...} is found, replace it with the content followed by a combining underline
    return latex.replace(/\\underline\{([^}]+)\}/g, (match, p1) => {
        return p1.split('').map(char => char + '\u0332').join('');
    });
}

function simpleFunctions(latex) {
    // A simple function is a function in format
    // [Function name][optional space][single character or {...}]
    const replacements = {
        '\\sin': 'sin',
        '\\cos': 'cos',
        '\\tan': 'tan',
        '\\csc': 'csc',
        '\\sec': 'sec',
        '\\cot': 'cot',
        '\\log': 'log',
        '\\ln': 'ln',
        '\\exp': 'exp',
        '\\max': 'max',
        '\\min': 'min',
        '\\arg': 'arg',
        '\\gcd': 'gcd',
        '\\deg': 'deg',
        '\\dim': 'dim',
        '\\hom': 'hom',
        '\\ker': 'ker',
        '\\Pr': 'Pr',
        '\\det': 'det',
        '\\mod': 'mod',
    };
    return latex.replace(/\\[a-zA-Z]+\s*(\{[^}]+\}|[^\s^_{}])/g, (match) => {
        const funcName = match.match(/\\[a-zA-Z]+/)[0];
        const rest = match.slice(funcName.length).trim();
        return (replacements[funcName] || funcName) + rest;
    });
}

function mathFont(latex) {
    const fontMap = {
        '\\mathbb': { 'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽', 'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁',
            'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ', 'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋',
            'U': '𝕌', 'V': '𝕍', 'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ'},
        '\\mathbf': { 'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉',
            'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓',
            'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'},
        '\\mathcal': { 'A': '𝒜', 'B': 'ℬ', 'C': '𝒞', 'D': '𝒟', 'E': 'ℰ', 'F': 'ℱ', 'G': '𝒢', 'H': 'ℋ', 'I': 'ℐ', 'J':'𝒥',
            'K': '𝒦', 'L': 'ℒ', 'M': 'ℳ', 'N': '𝒩', 'O': '𝒪', 'P': '𝒫', 'Q': '𝒬', 'R': 'ℛ', 'S': '𝒮', 'T': '𝒯',
            'U': '𝒰', 'V': '𝒱', 'W': '𝒲', 'X': '𝒳', 'Y': '𝒴', 'Z': '𝒵' },
        '\\mathfrak': { 'A': '𝔄', 'B': '𝔅', 'C': 'ℭ', 'D': '𝔇', 'E': '𝔈', 'F': '𝔉', 'G': '𝔊', 'H': 'ℌ', 'I': 'ℑ', 'J':'𝔍',
            'K': '𝔎', 'L': '𝔏', 'M': '𝔐', 'N': '𝔑', 'O': '𝔒', 'P': '𝔓', 'Q': '𝔔', 'R': 'ℜ', 'S': '𝔖', 'T': '𝔗',
            'U': '𝔘', 'V': '𝔙', 'W': '𝔚', 'X': '𝔛', 'Y': '𝔜', 'Z': 'ℨ' },
    };
    return latex.replace(/\\(mathbb|mathbf|mathcal|mathfrak)\s*(\{([^}]+)\}|([^\s^_{}]))/g, (match, p1, p2, p3, p4) => {
        const content = p3 || p4;
        const map = fontMap[`\\${p1}`];
        if (!map) return match;
        return content.split('').map(char => map[char] || char).join('');
    });
}

function handleMatrixes(latex) {
    let maxRows = 1;
    let builderList = [];

    const matrixRegex = /\\begin\{matrix\}([\s\S]*?)\\end\{matrix\}/g;
    let lastIndex = 0;
    let match;

    while ((match = matrixRegex.exec(latex)) !== null) {
        // Add text before the matrix
        if (match.index > lastIndex) {
            builderList.push(latex.slice(lastIndex, match.index));
        }
        // Parse matrix content
        const matrixType = match[1];
        const matrixContent = match[2].trim();
        // Split into rows
        const rows = matrixContent.split(/\\\\/).map(row =>
            row.trim().split('&').map(cell => cell.trim())
        );
        builderList.push({
            type: matrixType,
            data: rows
        });
        lastIndex = matrixRegex.lastIndex;
    }
    // Add remaining text after last matrix
    if (lastIndex < latex.length) {
        builderList.push(latex.slice(lastIndex));
    }


    // This function is a placeholder for future matrix handling if needed
    return builderList;
}