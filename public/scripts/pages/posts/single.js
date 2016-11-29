import { renderJs } from '../../libs/js-parser'
import { cacheId, cacheQuery } from '../../libs/utils'

export function single() {

	var cache = {};

	let postContent = cacheId(cache, 'post-content');

	function renderPost() {
		document.body.addClass = 'is-loading';

		let newPostContent = postContent.innerText;
		postContent.innerHTML = newPostContent;

		let codeContent = cacheQuery(cache, '.js-markup');

		Array.prototype.forEach.call(codeContent, function(content) {
		 	content.innerHTML = renderJs(content);
		}); 

		postContent.innerHTML = postContent.innerHTML.split("~").join("<br />").split("#").join("<span class='indent'></span>");
	}

	renderPost();
}