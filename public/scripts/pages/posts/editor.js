import showdown from 'showdown'
import axios from 'axios'
import { convertToFormat, convertInput } from './libs/events'
import { renderJs } from '../../libs/js-parser'

export function editor() {
	const pad = document.getElementById('pad');
	const convertedSection = document.getElementById('converted-section');
	const postTitle = document.getElementById('post-title');
	const postCategory = document.getElementById('post-category');
	const postTags = document.getElementById('post-tags');

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
		axios.post('http://localhost:8000/posts', {
			title: postTitle.value,
			category: postCategory.value,
			content: pad.value.split("\t").join('#').split('\n').join('~'),

			headers: {
				'Content-Type': 'Application/Json'
			}
		})
		.then((response) => {
			window.location.href = `/${data.title}`;
		})
	}

	pad.addEventListener('input', convertPad);
	pad.addEventListener('keydown', handleKeyPress);
	submitButton.addEventListener('click', submit);
}

/*	
	let converter = new showdown.Converter();
	let pad = document.getElementById('pad');
	let markdownSection = document.getElementById('markdown-section');
	let submitButton = document.getElementById('submit-post');
	let postTitle = document.getElementById('post-title');
	let sectionTitle = document.getElementById('post-section-title');
	let topicTitle = document.getElementById('post-topic-title');
	let section = document.getElementById('post-section');
	let codeElement = document.querySelectorAll('.js-markup');



	function submit() {
		let data = {};
		data.title = postTitle.value;
		data.sectionTitle = sectionTitle.value;
		data.topicTitle = topicTitle.value;
		data.section = section.value;
		data.content = pad.value.split("\t").join("#").split('\n').join("~");
		axios.post('http://localhost:3000/posts',  {
			title: data.title,
			section: data.section,
			sectionTitle: data.sectionTitle,
			content: data.content,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then((response) => {
			window.location.href = `/${data.topicTitle}`;
		});
	}

	function handleKeyPress(e) {
		var results;

		if (e.which == 9) {
			e.preventDefault();

			results = convertInput(e, pad);
			pad.selectionEnd = results.end;
			pad.value = results.value;
		}
	}

	function convertPad() {
		markdownSection.innerHTML = convertToFormat(pad, markdownSection);
	}

	pad.addEventListener('input', convertPad);
	pad.addEventListener('keydown', handleKeyPress);
	submitButton.addEventListener('click', submit);
} */