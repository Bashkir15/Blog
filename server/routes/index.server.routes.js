import express from 'express'
import indexController from '../controllers/index.server.controller'

const router = express.Router();
const index = indexController();

router.get('/', index.home);




router.get('/signup', (req, res) => {
	res.render('./templates/auth/signup');
});

router.get('/login', (req, res) => {
	res.render('./templates/auth/login');
});


module.exports = router