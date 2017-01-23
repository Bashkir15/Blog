
export function convertToFormat(fromEl, toEl) {
	return new Promise((resolve, reject) => {
		let markdownText = fromEl.value;
		let tabbedText = markdownText.split(`\t`).join(`<span class='indent'></span>`);
		let newlineText = tabbedText.split(`\n`).join(`<br />`);

		toEl.innerHTML = newlineText;
		
		resolve(toEl);
	})
}