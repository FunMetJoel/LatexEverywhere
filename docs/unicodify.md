# Unicodification
The chrome extension will generate a unicode representation of the formula to let people without the extension still read the math. It now has support for:
- Simple character replacement
- Fraction creation
- Root representation
- Superscript
- Subscript
- Overline
- Underline
- Simple functions (sin(), cos() ect)
- Math fonts (𝔸, 𝐀, 𝒜, 𝔄)

## Simple character replacement
The chrome extension will replace greek letters and mathematical operators from latex to a unicode counterpart.
For example `\cdot` will get replaced by ·, `\Omega` by Ω and `\neq` by ≠

<details>
<summary>All available characters</summary>

### Greek letters
`\alpha`: 'α',  
`\beta`: 'β',  
`\gamma`: 'γ',  
`\delta`: 'δ',  
`\epsilon`: 'ε',  
`\zeta`: 'ζ',  
`\eta`: 'η',  
`\theta`: 'θ',  
`\iota`: 'ι',  
`\kappa`: 'κ',  
`\lambda`: 'λ',  
`\mu`: 'μ',  
`\nu`: 'ν',  
`\xi`: 'ξ',  
`\omicron`: 'ο',  
`\pi`: 'π',  
`\rho`: 'ρ',  
`\sigma`: 'σ',  
`\tau`: 'τ',  
`\upsilon`: 'υ',  
`\phi`: 'φ',  
`\chi`: 'χ',  
`\psi`: 'ψ',  
`\omega`: 'ω',  

#### Variants
`\varepsilon`: 'ϵ',  
`\vartheta`: 'ϑ',  
`\varpi`: 'ϖ',  
`\varrho`: 'ϱ',  
`\varsigma`: 'ς',  
`\varphi`: 'ϕ',  

#### Uppercase
`\Gamma`: 'Γ',  
`\Delta`: 'Δ',  
`\Theta`: 'Θ',  
`\Lambda`: 'Λ',  
`\Xi`: 'Ξ',  
`\Pi`: 'Π',  
`\Sigma`: 'Σ',  
`\Upsilon`: 'Υ',  
`\Phi`: 'Φ',  
`\Chi`: 'Χ',  
`\Psi`: 'Ψ',  
`\Omega`: 'Ω',  

### Logic and set theory
`\emptyset`: '∅',  
`\varnothing`: '∅',  
`\infty`: '∞',  
`\aleph`: 'ℵ',  
`\hbar`: 'ℏ',  
`\nabla`: '∇',  
`\partial`: '∂',  
`\imath`: 'ı',  
`\jmath`: 'ȷ',  
`\ell`: 'ℓ',  
`\Re`: 'ℜ',  
`\Im`: 'ℑ',  
`\wp`: '℘',  
`\mho`: '℧',  
`\bot`: '⊥',  
`\top`: '⊤',  
`\forall`: '∀',  
`\exists`: '∃',  
`\neg`: '¬',

### Other (not categorized yet)
`\ast`: '∗',  
`\pm`: '±',  
`\cap`: '∩',  
`\lhd`: '◁',  
`\star`: '⋆',  
`\mp`: '∓',  
`\cup`: '∪',  
`\rhd`: '▷',  
`\cdot`: '·',  
`\amalg`: '⨿',  
`\uplus`: '⊎',  
`\triangleleft`: '◁',  
`\circ`: '∘',  
`\odot`: '⊙',  
`\sqcap`: '⊓',  
`\triangleright`: '▷',  
`\bullet`: '•',  
`\ominus`: '⊖',  
`\sqcup`: '⊔',  
`\unlhd`: '⊴',  
`\bigcirc`: '⃝',  
`\oplus`: '⊕',  
`\wedge`: '∧',  
`\unrhd`: '⊵',  
`\diamond`: '⋄',  
`\oslash`: '⊘',  
`\vee`: '∨',  
`\bigtriangledown`: '▽',  
`\times`: '×',  
`\otimes`: '⊗',  
`\dagger`: '†',  
`\bigtriangleup`: '△',  
`\div`: '÷',  
`\wr`: '≀',  
`\ddagger`: '‡',  
`\setminus`: '\',    
`\centerdot`: '·',  
`\Box`: '□',  
`\barwedge`: '⊼',  
`\veebar`: '⊻',  
`\circledast`: '⊛',  
`\boxplus`: '⊞',  
`\curlywedge`: '⋏',  
`\curlyvee`: '⋎',  
`\circledcirc`: '⊚',  
`\boxminus`: '⊟',  
`\Cap`: '⋒',  
`\Cup`: '⋓',  
`\circleddash`: '⊖',  
`\boxtimes`: '⊠',  
`\bot`: '⊥',  
`\top`: '⊤',  
`\dotplus`: '∔',  
`\boxdot`: '⊡',  
`\intercal`: '⊺',  
`\rightthreetimes`: '⋌',  
`\divideontimes`: '⋇',  
`\square`: '□',  
`\doublebarwedge`: '⩞',  
`\leftthreetimes`: '⋋',  
`\equiv`: '≡',  
`\leq`: '≤',  
`\geq`: '≥',  
`\perp`: '⊥',  
`\cong`: '≅',  
`\prec`: '≺',  
`\succ`: '≻',  
`\mid`: '|',  
`\neq`: '≠',  
`\preceq`: '⪯',  
`\succeq`: '⪰',  
`\parallel`: '∥',  
`\sim`: '∼',  
`\ll`: '≪',  
`\gg`: '≫',  
`\bowtie`: '⋈',  
`\simeq`: '≃',  
`\subset`: '⊂',  
`\supset`: '⊃',  
`\Join`: '⋊⋉',  
`\approx`: '≈',  
`\subseteq`: '⊆',  
`\supseteq`: '⊇',  
`\ltimes`: '⋉',  
`\asymp`: '≍',  
`\sqsubset`: '⊏',  
`\sqsupset`: '⊐',  
`\rtimes`: '⋊',  
`\doteq`: '≐',  
`\sqsubseteq`: '⊑',  
`\sqsupseteq`: '⊒',  
`\smile`: '⌣',  
`\propto`: '∝',  
`\dashv`: '⊣',  
`\vdash`: '⊢',  
`\frown`: '⌢',  
`\models`: '|=',  
`\in`: '∈',  
`\ni`: '∋',  
`\notin`: '∉',  
`\approxeq`: '≊',  
`\leqq`: '≦',  
`\geqq`: '≧',  
`\lessgtr`: '≶',  
`\thicksim`: '∼',  
`\leqslant`: '⩽',  
`\geqslant`: '⩾',  
`\lesseqgtr`: '⋚',  
`\backsim`: '∽',  
`\lessapprox`: '⪅',  
`\gtrapprox`: '⪆',  
`\lesseqqgtr`: '⪋',  
`\backsimeq`: '⋍',  
`\lll`: '≪',  
`\ggg`: '≫',  
`\gtreqqless`: '⪌',  
`\triangleq`: '≜',  
`\lessdot`: '⋖',  
`\gtrdot`: '⋗',  
`\gtreqless`: '⋛',  
`\circeq`: '⊜',  
`\lesssim`: '≲',  
`\gtrsim`: '≳',  
`\gtrless`: '≷',  
`\bumpeq`: '≏',  
`\eqslantless`: '⪕',  
`\eqslantgtr`: '⪖',  
`\backepsilon`: '϶',  
`\Bumpeq`: '≎',  
`\precsim`: '≾',  
`\succsim`: '≿',  
`\between`: '≬',  
`\doteqdot`: '≑',  
`\precapprox`: '≾',  
`\succapprox`: '≿',  
`\pitchfork`: '⋔',  
`\thickapprox`: '≈',  
`\Subset`: '⋐',  
`\Supset`: '⋑',  
`\shortmid`: '∣',  
`\fallingdotseq`: '≒',  
`\subseteqq`: '⫅',  
`\supseteqq`: '⫆',  
`\smallfrown`: '⌢',  
`\risingdotseq`: '≓',  
`\smallsmile`: '⌣',  
`\varpropto`: '∝',  
`\preccurlyeq`: '≼',  
`\succcurlyeq`: '≽',  
`\Vdash`: '⊩',  
`\therefore`: '∴',  
`\curlyeqprec`: '⋞',  
`\curlyeqsucc`: '⋟',  
`\vDash`: '⊨',  
`\because`: '∵',  
`\blacktriangleleft`: '◀',  
`\blacktriangleright`: '▶',  
`\Vvdash`: '⊪',  
`\eqcirc`: '≖',  
`\trianglelefteq`: '⊴',  
`\trianglerighteq`: '⊵',  
`\vartriangleleft`: '◁',  
`\vartriangleright`: '▷',  
`\nshortparallel`: '∦',  
`\ncong`: '≇',  
`\nleq`: '≰',  
`\ngeq`: '≱',  
`\nsubseteq`: '⊈',  
`\nmid`: '∤',  
`\nleqq`: '≰',  
`\ngeqq`: '≱',  
`\nsupseteq`: '⊉',  
`\nparallel`: '∦',  
`\nleqslant`: '≰',  
`\ngeqslant`: '≱',  
`\nsubseteqq`: '⊈',  
`\nshortmid`: '∤',  
`\nless`: '≮',  
`\ngtr`: '≯',  
`\nsupseteqq`: '⊉',  
`\nprec`: '⊀',  
`\nsucc`: '⊁',  
`\subsetneq`: '⊊',  
`\nsim`: '≁',  
`\npreceq`: '⋠',  
`\nsucceq`: '⋡',  
`\supsetneq`: '⊋',  
`\nVDash`: '⊯',  
`\precnapprox`: '⪹',  
`\succnapprox`: '⪺',  
`\subsetneqq`: '⫋',  
`\nvDash`: '⊭',  
`\precnsim`: '⋨',  
`\succnsim`: '⋩',  
`\supsetneqq`: '⫌',  
`\nvdash`: '⊬',  
`\lnapprox`: '⪉',  
`\gnapprox`: '⪊',  
`\varsubsetneq`: '⊊',  
`\ntriangleleft`: '⋪',  
`\lneq`: '⪇',  
`\gneq`: '⪈',  
`\varsupsetneq`: '⊋',  
`\ntrianglelefteq`: '⋬',  
`\lneqq`: '≨',  
`\gneqq`: '≩',  
`\varsubsetneqq`: '⫋',  
`\ntriangleright`: '⋫',  
`\lnsim`: '⋦',  
`\gnsim`: '⋧',  
`\varsupsetneqq`: '⫌',  
`\ntrianglerighteq`: '⋭',  
`\lvertneqq`: '≨',  
`\gvertneqq`: '≩',  


</details>

## Fraction creation
There are multiple possible fraction creation methods, based on types of characters in the parts of the fraction

### Simple replacement
Unicode has some fractions in it. Tease will just be replaces by their unicode counterpart. The default unicode fractions are:  
'½', '⅓', '⅔', '¼', '¾', '⅕', '⅖', '⅗', '⅘', '⅙', '⅚', '⅐', '⅛', '⅜', '⅝', '⅞', '⅑' and '⅒'

### Numerical fractions
Other fractions containing only numbers, but who do not have a simple unicode replacement character, will get made up in the following format:  
`[superscript numbers]`/`[subscript numbers]`
For instance: the fraction `\frac{210}{42}` will get replaced by ²¹⁰⁄₄₂.

### Other fractions
Not all fractions can be neatly replaced. as a fallback option, the extension generates:
(`[numerator]`)/(`[denominator]`).
For example:  
`\frac{a+b}{c+d}` will get replaced by (a+b)/(c+d)

## Roots
There are two types of roots in latex: square roots and other power roots.  
`\sqrt{expression}`: Will generate something in the format √(`[expression]`)  
`\sqrt[n]{expression}`: Will generate something in the format ⁿ√(`[expression]`), where n will get replaced by the superscript number.

## Superscript and Subscript
The uniquifier will replace numbers in the format `^[number]` by the superscript number character. It will also replace `_[number]` to the subscript number
> [!WARNING]
> Not all characters have a unicode sub or superscript. Things that can be sub or superscript in latex may not be able to render neatly in unicode

## Overline and underline
Unicode has some inviable characters that overline or underline the following character. The code adds this character to each character between the baskets of the `\overline{}` statements. 
For instance, `\underline{AB}` would get replaced by A̲B̲

## Simple functions
Some functions are just text with brackets. Latex will make a difference between `sin(x)` and `\sin(x)`. But in unicode, they should just be the same. So we replace them by the plain text counterpart.  
Eg, `\sin(x)` will get replaced by sin(x)

<details>
<summary>Replaced functions</summary>  

`\sin`: 'sin',  
`\cos`: 'cos',  
`\tan`: 'tan',  
`\csc`: 'csc',  
`\sec`: 'sec',  
`\cot`: 'cot',  
`\log`: 'log',  
`\ln`: 'ln',  
`\exp`: 'exp',  
`\max`: 'max',  
`\min`: 'min',  
`\arg`: 'arg',  
`\gcd`: 'gcd',  
`\deg`: 'deg',  
`\dim`: 'dim',  
`\hom`: 'hom',  
`\ker`: 'ker',  
`\Pr`: 'Pr',  
`\det`: 'det',  
`\mod`: 'mod',  
</details>


## Math fonts
When writing math, sometimes other fonts are used. We should use these fonts, as they carry meaning.  
`\mathbb{ABC}`: 𝔸𝔹ℂ  
`\mathbf{ABC}`: 𝐀𝐁𝐂  
`\mathcal{ABC}`: 𝒜ℬ𝒞  
`\mathfrak{ABC}`: 𝔄𝔅ℭ  