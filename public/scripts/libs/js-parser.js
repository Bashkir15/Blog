let strReg1 = /"(.*?)"/g;
let strReg2 = /'(.*?)'/g;
let strReg3 = /`(.*?)`/g;

let insideParen = /(.*?)/g;
let methodReg = /\b(new|var|function|forEach|let|map|const|map|pop|push|split|join|replace|slice|filter|async|add|await|extends|document|window|Array|Object|String|Boolean|angular|React|indexOf|concat|match|toString|length|toObject|hasOwnProperty|includes|getElementsBy(TagName|ClassName|Name)|getElementById|typeof|instanceof|querySelector|querySelectorAll|\$)(?=[^\w])/g;
let setReg = /\b(null|with|undefined)(?=[^\w])/g;
let numberReg = /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/
let conditionReg = /\b(if|do|while|switch|for|in|break|case|return|export|default|import|from|delete|Throw|Error|try|yield|catch|as|implements|public)(?=[^\w])/g;
let staticReg = /\b(get|continue|static|set|finally)(?=[^\w])/g;
let otherReg = /\b(this|then)(?=[^\w])/g;
let specialCommentReg = /(\/\*.*\*\/)/g;
let inlineCommentReg = /(\/\/.*)/g;
let htmlTagReg = /($lt;[^\&]*&gt;)/g;

export function renderJs(item) {
	let string = item.innerHTML;
	let parsed = string.replace(strReg1, '<span class="string">"$1"</span>');
	parsed = parsed.replace(strReg2, "<span class=\"string\">'$1'</span>");
	parsed = parsed.replace(strReg3, '<span class="string">`$1`</span>');
	parsed = parsed.replace(methodReg, '<span class="method">$1</span>');
	parsed = parsed.replace(setReg, '<span class="setter">$1</span>');
	parsed = parsed.replace(numberReg, '<span class="number">$1</span>');
	parsed = parsed.replace(conditionReg, '<span class="condition">$1</span>');
	parsed = parsed.replace(staticReg, '<span class="static">$1</span>');
	parsed = parsed.replace(otherReg, '<span class="other">$1</span>');
	
	return item.innerHTML = parsed;
}


// enum
// number /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
//regex /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/