export function single() {
	let accordian = document.querySelectorAll('.single-section-posts');
	let accordianSections = Array.prototype.slice.call(accordian, 0);


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