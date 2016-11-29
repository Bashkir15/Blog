import { renderJs } from '../../libs/js-parser'

export function single() {
	let postContent = document.getElementById('post-content');

	function renderPost() {
		document.body.addClass = 'is-loading';

		let newPostContent = postContent.innerText;
		postContent.innerHTML = newPostContent;

		let codeContent = document.querySelectorAll('.markup-js');

		Array.prototype.forEach.call(codeContent, function(content) {
		 	content.innerHTML = renderJs(content);
		}); 
	}

	renderPost();
}