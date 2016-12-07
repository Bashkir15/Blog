import axios from 'axios'
import { cacheId } from '../libs/utils'

export function search() {
	var cache = {};
	var results = [];

	const searchContainer = cacheId(cache, 'searchContainer');


	function doSearch(val) {
		axios.post(`http://localhost:3000/posts/${val}`, {
			keyword: val,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			results = response.data.res.records.concat(results);
			createDOM(results);
		})
	}

	function createDOM(results) {
		var resultsContainer = document.createElement('div');
		resultsContainer.className = "search-results";

		for (var i = 0; i < results.length; i++) {
			let singleResult = results[i];
			var singleContainer = document.createElement('div');
			singleContainer.className = 'search-single-result';

			let resultsHTML = `<h3 class="search-single-title">${singleResult.title}</h3><p class='search-description'>${singleResult.description}</p>`;
			singleContainer.innerHTML = resultsHTML;
			resultsContainer.appendChild(singleContainer);
		}

		//something appendChild, maybe a window I have already created and styled and have just hidden so does't have to be created?
	}
}