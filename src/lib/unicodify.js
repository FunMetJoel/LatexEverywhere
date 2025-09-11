
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

    return result;
}

export function replaceCaractersWithUnicode(latex) {
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

    const replacements = {
        ...greekLetters,
        ...binaryCaracters,
    };

    return latex.replace(/\\[a-zA-Z]+/g, match => replacements[match] || match);
}

export function replaceFractions(latex) {
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
    result = result.replace(/\\frac\{(\d+)\}\{(\d+)\}/g, (match, p1, p2) => {
        const key = `\\frac{${p1}}{${p2}}`;
        return unicodeFractions[key] || match;
    });

    // Replace other simple fractions with superscript / subscript
    result = result.replace(/\\frac\{(\d+)\}\{(\d+)\}/g, (match, p1, p2) => {
        const superscript = p1.split('').map(char => superscriptMap[char] || char).join('');
        const subscript = p2.split('').map(char => subscriptMap[char] || char).join('');
        return superscript + '⁄' + subscript;
    });

    // Handle complex fractions
    // \frac{a+b}{c+d} -> (a+b)/(c+d)
    result = result.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (match, p1, p2) => {
        return `(${p1})/(${p2})`;
    });

    return result;
}

export function replaceRoots(latex) {
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