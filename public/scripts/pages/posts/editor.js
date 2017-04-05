import showdown from 'showdown'
import axios from 'axios'
import { convertToFormat, convertInput } from './libs/events'
import { renderJs } from '../../libs/js-parser'
import { checkAdmin } from '../../libs/auth'

export function editor() {
	
	const pad = document.getElementById('pad');
	const convertedSection = document.getElementById('converted-section');
	const postTitle = document.getElementById('post-title');
	const postCategory = document.getElementById('post-category');
	const postTags = document.getElementById('post-tags');
	const postDescription = document.getElementById('post-description');
	const postSeries = document.getElementById('post-series');
	const submitButton = document.querySelector('.editor-submit button');

	function handleKeyPress(e) {
		let results;

		if (e.which == 9) {
			e.preventDefault();

			results = convertInput(e, pad);
			pad.selectionEnd = results.end;
			pad.value = results.value;
		}
	}

	function convertPad() {
		convertedSection.innerHTML = convertToFormat(pad, convertedSection);
	}

	function submit() {
		axios.post('/posts', {
			title: postTitle.value,
			category: postCategory.value,
			content: pad.value.split("\t").join('#').split('\n').join('~'),
			tags: postTags.value.split(" "),
			series: postSeries.value,
			description: postDescription.value,

			headers: {
				'Content-Type': 'Application/Json'
			}
		})
		.then((response) => {
			console.log(response);
		})
	}

	pad.addEventListener('input', convertPad);
	pad.addEventListener('keydown', handleKeyPress);
	submitButton.addEventListener('click', submit);
}
