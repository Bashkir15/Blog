
export function convertToFormat(fromEl, toEl) {
	let markdownText = fromEl.value;
	let newlineText = markdownText.split(`\n`).join(`<br />`);

	return newlineText;
}

export function convertInput(e, el) {

	if (e.which == 9) {
		e.preventDefault();
 		let s = el.selectionStart;
		var end = el.selectionEnd;
		var value = el.value;


		value = value.substring(0, s) + `\t` + value.substring(end);
		end = s + 1;

		return {
			value: value,
			end: end
		};
	}
}