import express from 'express'
import indexController from '../controllers/index.server.controller'
import auth from '../helpers/auth'

const router = express.Router();
const index = indexController();

router.get('/', index.home);

// Create a function that will make a request to server before route transition to 
// verify admin, and then transition to editor page

router.get('/create-post', (req, res) => {
	res.render('./templates/posts/editor/editor');
});

router.get('/signup', (req, res) => {
	res.render('./templates/auth/signup');
});

router.get('/login', (req, res) => {
	res.render('./templates/auth/login');
});

router.post('/checkAdmin', auth.ensureAdmin);

module.exports = router