import express from 'express'
import postController from '../controllers/posts.server.controller'

const router = express.Router();
const posts = postController();

router.post('/', posts.create);
router.get('/:title', posts.single);
router.get('/tags/:tag', posts.tag);

module.exports = router;