export function single() {

	function makeAccordian(accordian) {
		accordian = accordian || document.querySelectorAll('.single-section-posts');
		let toggleButton = document.querySelectorAll('.close-section-button');
		let currentTarget;

		for (var i = 0; i < toggleButton.length; i++) {
			let target = toggleButton[i];

			target.addEventListener('click', function() {
				currentTarget = this.parentNode;

				if (currentTarget.classList.contains('closed')) {
					target.classList.remove('section-closed');
					currentTarget.classList.remove('closed');
				} else {
					target.classList.add('section-closed');
					currentTarget.classList.add('closed');
				}
			}, false);
		}

		for (var i = 0; i < accordian.length; i++) {
			makeAccordian(accordian[i]);
		}

		/*for (var i = 0; i < accordianSections.length; i++) {
			let section = accordianSections[i];

			for (var j = 0; j < toggleButtons.length; j++) {
				let button = toggleButtons[j];

				button.addEventListener('click', () => {
					if (section.classList.contains('section-closed')) {
						button.classList.remove('section-closed');
						section.classList.remove('section-closed');
					} else {
						section.classList.add('section-closed');
						button.classList.add('section-closed');
					}
				});
			}
		} */
		/*accordianSections.forEach((section) => {
			let toggleButton = document.querySelectorAll('.close-section-button');
			let toggleButtons = Array.prototype.slice.call(toggleButton, 0);

			toggleButton.forEach((button) => {
				button.addEventListener('click', () => {
					if (section.classList.contains('section-closed')) {
						toggleButton.classList.remove('section-closed');
						section.classList.remove('section-closed');
					} else {
						section.classList.add('section-closed');
						toggleButton.classList.add('section-closed');
					}
				});
			});
		}); */
	}

	makeAccordian();
}