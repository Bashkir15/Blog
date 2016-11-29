let strReg1 = /"(.*?)"/g;
let strReg2 = /'(.*?)'/g;
let specialReg = /\b(new|var|if|do|function|while|switch|for|foreach|in|continue|break|let|map|const)(?=[^\w])/g;
let specialJsGlobReg = /\b(document|window|Array|\$)(?=[^w])/g;
let specialJsReg = /\b(getElementsBy(TagName|ClassName|Name)|getElementById|typeof|instanceof)(?=[^\w])/g;
let specialMathReg = /\b(indexOf|match|replace|toString|length)(?=[^\w])/g;
let specialCommentReg = /(\/\*.*\*\/)/g;
let inlineCommentReg = /(\/\/.*)/g;
let htmlTagReg = /($lt;[^\&]*&gt;)/g;

export function renderJs(item) {
	let string = item.innerHTML;
	let parsed = string.replace(strReg1, '<span class="string">"$1"</span>');
	parsed = parsed.replace(strReg2, "<span class\"string\">'$1'</span>");
	parsed = parsed.replace(specialReg, '<span class="special">$1</span>');
	parsed = parsed.replace(specialJsGlobReg, '<span class="special-js-glob">$1</span>');
	parsed = parsed.replace(specialJsReg, '<span class="special-js">$1</span>');
	parsed = parsed.replace(specialMathReg, '<span class="special-js-math">$1</span>');
	parsed = parsed.split("~").join("<br />");
	parsed = parsed.split("#").join("<span class='indent'></span>");
	
	return item.innerHTML = parsed;
}