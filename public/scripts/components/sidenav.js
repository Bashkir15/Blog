class SideNav {
	constructor() {
		this.container = document.getElementById('side-nav-container');
		this.sidenav = document.getElementById('side-nav');
		this.closeButton = document.getElementById('side-nav-close');
		this.animatedClass = 'side-nav-container--animatable';
		this.openClass = 'side-nav-container--open';
		this.closeKeys = [27];


		this.toggleSidenav = this._toggle.bind(this);
		this.closeSidenav = this._close.bind(this);

	}

	_toggle() {
		this.sidenav.style.willChange = 'transform';
		this.container.classList.add(this.animatedClass);

		let onCloseKey = this._closeKeyHandler.bind(this);


		if (this.container.classList.contains(this.animatedClass) && !this.container.classList.contains(this.openClass)) {
			this._addEvents();
			this.container.classList.add(this.openClass);
			this.closeButton.addEventListener('click', this.toggleSidenav);
			document.addEventListener('keydown', onCloseKey);
		} else {
			this.closeSidenav();
		}

		this.sidenav.style.willChange = 'auto';
	}

	_close() {
		let onCloseKey = this._closeKeyHandler.bind(this);

		this.sidenav.style.willChange = 'transform';
		this.container.classList.add(this.animatedClass);

		this._addEvents();
		this.container.classList.remove(this.openClass);
		this.closeButton.removeEventListener('click', this.toggleSidenav);
		document.removeEventListener('keydown', onCloseKey);
	}

	_closeKeyHandler(e) {
		if (this.closeKeys.indexOf(e.which) != -1) {
			e.preventDefault();
			this.closeSidenav();

		}
	}



	_onTransitionEnd() {
		this.container.classList.remove(this.animatedClass);
	}

	_addEvents() {
		let _onTransitionEnd = this._onTransitionEnd.bind(this);

		this.container.addEventListener('transitionend', _onTransitionEnd);
	}
}

export default SideNav