
import http from 'http'
import mongoose from 'mongoose'
import Topics from './server/models/topics'
import Sections from './server/models/sections'
import Posts from './server/models/posts'
import Users from './server/models/users'

import express from './server/config/express'


const config = require('./server/config/env/' + (process.env.NODE_ENV || 'development'));

const db = mongoose.connect(config.db, () => {
	console.log('Database connected');
});

const app = express(db);
const server = http.createServer(app);

global.config = config;


server.listen(3000, () => {
	console.log('The application has connected');
});