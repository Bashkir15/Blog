import path from 'path'
import morgan from 'morgan'
import express from 'express'
import http from 'http'


const app = express();
const server = http.createServer(app);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'app')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'app/index.html'));
});

server.listen(3000, () => {
	console.log('The application has connected');
});