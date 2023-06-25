const loginForm = document.querySelector('#login-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName;

const login = (e) => {
	e.preventDefault();
	if (userNameInput.value !== '') {
		userName = userNameInput.value;
		loginForm.classList.remove('show');
		messagesSection.classList.add('show');
	} else {
		alert('Please provide your username.');
	}
};

loginForm.addEventListener('submit', login);

const sendMessage = (e) => {
	e.preventDefault();

	if (messageContentInput.value.trim() !== '') {
		addMessage(userName, messageContentInput.value);
		messageContentInput.value = '';
	} else {
		alert('You cannot send an empty message.');
	}
};

addMessageForm.addEventListener('submit', sendMessage);

const addMessage = (author, messageContent) => {
	const message = document.createElement('li');
	message.classList.add('message', 'message--received');
	if (author === userName) {
		message.classList.add('message--self');
	}
	message.innerHTML = `<h3 class="message__author">${
		userName === author ? 'You' : author
	}</h3>
    <div class="message__content">${messageContent}</div>
  `;
	messagesList.appendChild(message);
};
