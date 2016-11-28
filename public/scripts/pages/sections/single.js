export function single() {
	let accordianSections = document.querySelectorAll('.single-section-posts');

	function makeAccordian() {
		accordianSections.forEach((section) => {
			let toggleButton = document.querySelector('.close-section-button');

			toggleButton.addEventListener('click', () => {
				if (section.classList.contains('section-closed')) {
					toggleButton.classList.remove('section-closed');
					section.classList.remove('section-closed');
				} else {
					section.classList.add('section-closed');
					toggleButton.classList.add('section-closed');
				}
			});
		});
	}

	makeAccordian();
}