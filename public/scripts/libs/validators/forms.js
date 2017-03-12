const formWrapper = document.querySelectorAll('.form-wrappers');
const submitButton = document.querySelectorAll('.form-submit');

export function onBlur(nodes) {
	let i;
	let len = nodes.length;

	for (i = 0; i < len; i++) {
		nodes[i].addEventListener('blur'. inputBlur);
	}
}

function validateEmail(node) {
	let value = node.value;
	let atpos = value.indexOf('@');
	let dotpos = value.lastIndexOf('.');

	if (atpos < 1 || (dotpos - atpos) < 2) {
		if (node.parentNode.classList.contains('blank')) {
			node.parentNode.classList.remove('blank');
		}

		node.parentNode.classList.add('email-invalid');
	} else {
		if (node.parentNode.classList.contains('blank')) {
			node.parentNode.classList.remove('blank');
		}

		if (node.parentNode.classList.contains('email-invalid')) {
			node.parentNode.classList.remove('email-invalid');
		}

		node.parentNode.classList.add('email-valid');
	}
}

function validatePassword() {
	if (nodes[0].value != nodes[1].value) {
		nodes[0].parentNode.classList.add('password-invalid');
	} else if (nodes[1].value != nodes[0].value) {
		nodes[1].parentNode.classList.add('password-invalid');
	} else {
		nodes[0].parentNode.classList.add('password-valid');
		nodes[1].parentNode.classList.add('password-valid');
	}
}


function inputBlur() {


	let formContent = this.value;

	if (formContent == '') {
		this.parentNode.classList.add('blank');
	}

	if (this.parentNode.classList.contains('form-email')) {
		validateEmail(this);
	}

	if (this.parentNode.classList.contains('form-confirm')) {
		validatePasswords();
	}

	if (formContent != '' && !this.parentNode.classList.contains('form-email') && !this.parentNode.classList.contains('form-password') && !this.parentNode.classList.contains('form-confirm')) {
		if (this.parentNode.classList.contains('blank')) {
			this.parentNode.classList.remove('blank');
		}

		this.parentNode.classList.add('valid');
	}

	checkValidForm();
}

function checkValidForm() {
	let length = formWrapper.length;
	let i = 0;
	let valid = 0;

	for (i = 0; i < length; i++) {
		let wrapper = formWrapper[i];

		if (wrapper.classList.contains('valid') || wrapper.classList.contains('email-valid') || wrapper.classList.contains('password-valid')) {
			valid++;
		}
	}

	if (valid == length) {
		submitButton.classList.add('form-valid');
	}
}