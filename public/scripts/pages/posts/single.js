
let postContent = document.getElementById('post-content');

function renderPost() {
	document.body.addClass = 'is-loading';

	let newPostContent = postContent.innerText;
	postContent.innerHTML = newPostContent;
}

renderPost();