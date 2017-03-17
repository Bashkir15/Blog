
import http from 'http'
import mongoose from 'mongoose'
import Category from './server/models/categories'
import Users from './server/models/users'

import express from './server/config/express'

const environment = (process.env.NODE_ENV || 'development');
const config = require(`./server/config/env/${environment}`);

const db = mongoose.connect(config.db, () => {
	console.log('Database connected');
});

const app = express(db);
const server = http.createServer(app);

global.config = config;


server.listen(config.server.port, () => {
	console.log('The application has connected');
});