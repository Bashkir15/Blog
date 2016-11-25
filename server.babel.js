import path from 'path'
import morgan from 'morgan'
import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Topics from './server/models/topics'
import Sections from './server/models/sections'
import Users from './server/models/users'

const usersController = require('./server/controllers/users.server.controller')();
const topicsController = require('./server/controllers/topics.server.controller')();
const sectionsController = require('./server/controllers/sections.server.controller')();

const config = require('./server/env/' + (process.env.NODE_ENV || 'development'));

const db = mongoose.connect(config.db, () => {
	console.log('Database connected');
});

const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'app')));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'app/index.html'));
});

app.post('/users', usersController.create);
app.post('/topics', topicsController.create);
app.post('/sections', sectionsController.create);

global.config = config;


server.listen(3000, () => {
	console.log('The application has connected');
});