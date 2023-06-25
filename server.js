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
	socket.on('join', (userName) => {
		socket.broadcast.emit('message', {
			author: 'Chat Bot',
			content: userName + ' has joined the chat!',
		});
		users.push({ name: userName, id: socket.id });
	});
	socket.on('message', (message) => {
		messages.push(message);
		socket.broadcast.emit('message', message);
	});

	socket.on('disconnect', () => {
		const userIndex = users.findIndex((user) => user.id === socket.id);
		if (userIndex !== -1) {
			const userLeft = users.splice(userIndex, 1)[0];
			socket.broadcast.emit('message', {
				author: 'Chat Bot',
				content: userLeft.name + ' has left the chat!',
			});
		}
	});
});
