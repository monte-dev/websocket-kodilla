const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

app.use(express.static(path.join(__dirname, '/client/')));

const messages = [];
const users = [];

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
	console.log('Server is running on Port:', 8000);
});

const io = socket(server);

io.on('connection', (socket) => {
	console.log('New client! Its id – ' + socket.id);
	socket.on('join', (userName) => {
		console.log(userName + ', ' + socket.id + ' has entered the chat');

		users.push({ name: userName, id: socket.id });
		console.log(users);
	});
	socket.on('message', (message) => {
		messages.push(message);
		socket.broadcast.emit('message', message);
	});

	socket.on('disconnect', () => {
		const userIndex = users.findIndex((user) => user.id === socket.id);

		users.splice(userIndex, 1);
		console.log('Oh, socket ' + socket.id + ' has left');
	});
});
