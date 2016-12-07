
class modal {
	constructor(options) {
		this.settings = {
			closeButton: null,
			modal: null,
			overlay: null,
			transitionEnd: null,
			className: 'dialog',
			maxwidth: 1500,
			minWidth: 450,
			overlay: true
		}

		this._applySetttings(options);
		this.open = this._open.bind(this);
		this.close = this._close.bind(this);
	}

	_applySettings(options) {
		if (typeof options === 'object') {
			for (var i in options) {
				if (options.hasOwnProperty(i)) {
					this.settings[i] = options[i];
				}
			}
		}
	}

	_open() {
		_buildOut.call(this);
		initializeEvents.call(this);
		window.getComputedStyle(this.modal).height;
		this.settings.modal.className = this.settings.modal.className + (this.settings.modal.offsetHeight > window.innerHeight ? 'dialog-open dialog-anchored': 'dialog-open' );
		this.settings.overlay.className = this.settings.overlay.className + 'dialog-open';
	}

	_buildOut() {
		let content,
		contentHolder,
		docFrag;

		docFrag = document.createDocumentFragment();

		this.settings.modal = document.createElement('div');
		this.settings.modal.className = 'modal ' + this.settings.className;
		this.settings.modal.style.minWidth = this.settings.minWidth + "px";
		this.settings.modal.style.maxWidth = this.settings.maxwidth + "px";
		this.settings.modal.style.top = window.pageYOffset + (window.innerHeight / 2) + "px";
		this.settings.modal.style.left = (window.innerWidth + this.settings.modal.offsetWidth) / 2 + "px"

		if (typeof this.settings.content === 'string') {
			content = this.settings.content;
		} else {
			content = this.settings.content.innerHTML;
		}

		if (this.settings.closeButton === true) {
			this.settings.closeButton = document.createElement('button');
			this.settings.closeButton.className = 'dialog-close close-button';
			this.settings.closeButton.innerHTML = '<span class="icon-close"></span>'
			this.settings.modal.appendChild(this.settings.closeButton);
		}

		if (this.settings.overlay === true) {
			this.settings.overlay = document.createElement('div');
			this.overlay.className = 'dialog-overlay' + this.settings.className;
			docFrag.appendChild(this.settings.overlay);
		}

		contentHolder = document.createElement('div');
		contentHolder.className = 'dialog-content';
		contentHolder.innerHTML = content;

		this.settings.modal.appendChild(contentHolder);
		docFrag.appendChild(this.modal);
		document.body.appendChild(docFrag);
	}

	initializeEvents() {
		if (this.settings.closeButton) {
			this.settings.closeButton.addEventListener('click', this.close.bind(this));
		}

		if (this.overlay) {
			this.settings.overlay.addEventListener('click', this.close.bind(this));
		}
	}
}