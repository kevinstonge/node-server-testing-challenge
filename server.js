const express = require('express');
const server = express();
const helmet = require('helmet');
server.use(helmet());
const cors = require('cors');
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => { res.status(200).json({ message: "server online" }) });

const usersRouter = require('./data/users/userRouter.js');
server.use('/api/users', usersRouter);

module.exports = server;