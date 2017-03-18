import { renderJs } from '../../libs/js-parser'

export default function single() {
	const postContent = document.getElementById('post-content');

	function renderPost() {
		document.body.addClass = 'is-loading';

		let newPostContent = postContent.innerText;
		postContent.innerHTML = newPostContent;

		let codeContent = document.querySelectorAll('.markup-js');

		Array.prototype.forEach.call(codeContent, function(content) {
			content.innerHTML = renderJs(content);
		});



		/*for (let i = 0; i < jsLength; i++) {
			let content = jsContent[i];

			content.innerHTML = renderJs(content);
		} */

		postContent.innerHTML = postContent.innerHTML.split("~").join("<br />").split("#").join("<span class='indent'></span>");
	}

	renderPost();
}