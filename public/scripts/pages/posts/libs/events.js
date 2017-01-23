
export function convertToFormat(fromEl, toEl) {
	return new Promise((resolve, reject) => {
		let markdownText = fromEl.value;
		let tabbedText = markdownText.split(`\t`).join(`<span class='indent'></span>`);
		let newlineText = tabbedText.split(`\n`).join(`<br />`);

		toEl.innerHTML = newlineText;
		
		return resolve(toEl.innerHTML);
	})
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