import showdown from 'showdown'
import axios from 'axios'
import { renderJs } from '../../libs/js-parser'

export function editor() {
	let converter = new showdown.Converter();
	let pad = document.getElementById('pad');
	let markdownSection = document.getElementById('markdown-section');
	let submitButton = document.getElementById('submit-post');
	let postTitle = document.getElementById('post-title');
	let sectionTitle = document.getElementById('post-section-title');
	let topicTitle = document.getElementById('post-topic-section');
	let section = document.getElementById('post-section');
	let codeElement = documet.querySelectorAll('.js-markup');

	function convertTextToMarkdown() {
		let markdownText = pad.value.split("\t").join("#").split('\n').join("~");
		markdownSection.innerHTML = markdownText;
		
		Array.prototype.forEach.call(codeElement, (element) => {
			element.innerHTML = renderJs(element);
		});

		markdownSection.innerHTML = markdownSection.innerHTML.split("~").join("<br />").split("#").join("<span class='indent'></span>")

	}

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

	pad.addEventListener('input', convertTextToMarkdown);
	pad.addEventListener('keydown', (e) => {

		if (e.which == 9) {
			e.preventDefault();
			let s = pad.selectionStart;
			pad.value = pad.value.substring(0, pad.selectionStart) + "\t" + pad.value.substring(pad.selectionEnd);
			pad.selectionEnd = s + 1
		}
	});
	submitButton.addEventListener('click', submit);
}