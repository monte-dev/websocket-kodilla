const loginForm = document.querySelector('#login-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-message-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let userName;

const login = (e) => {
	e.preventDefault();
	if (userNameInput !== null || userNameInput.length > 0) {
		userName = userNameInput.value;
		loginForm.classList.remove('show');
		messagesSection.classList.add('show');
	} else {
		alert('Please provide your username.');
	}
};

loginForm.addEventListener('submit', login);
