import express from 'express'
import topicsController from '../controllers/topics.server.controller'
import sectionsController from '../controllers/sections.server.controller'
import postsController from '../controllers/posts.server.controller'

let router = express.Router();
let topics = topicsController();
let sections = sectionsController();
let posts = postsController();

router.get('/', topics.list);
router.get('/create-topic', (req, res) => {
	res.render('./templates/topics/create/create');
});

router.get('/signup', (req, res) => {
	res.render('./templates/auth/signup');
});

router.get('/login', (req, res) => {
	res.render('./templates/auth/login');
});

router.get('/latest', posts.latest);
router.get('/:title', topics.single);
router.get('/:title/create-section', topics.createSection);
router.get('/:title/create-post', sections.createPost);
router.get('/:topicTitle/:postTitle/:title', posts.single);

module.exports = router