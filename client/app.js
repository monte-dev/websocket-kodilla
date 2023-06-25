const loginForm = document.querySelector('#login-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName;

const socket = io();

//listeners
socket.on('message', (event) => addMessage(event.author, event.content));

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

function sendMessage(e) {
	e.preventDefault();

	let messageContent = messageContentInput.value;

	if (!messageContent.length) {
		alert('You have to type something!');
	} else {
		addMessage(userName, messageContent);
		socket.emit('message', { author: userName, content: messageContent });
		messageContentInput.value = '';
	}
}

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
