import express from 'express'
import topicsController from '../controllers/topics.server.controller'

let router = express.Router();
let topics = topicsController();

router.get('/', topics.list);
router.get('/create-topic', (req, res) => {
	res.render('./templates/topics/create/create');
});
router.get('/:title', topics.single);
router.get('/:title/create-section', topics.createSection);

module.exports = router