import express from 'express'
import postController from '../controllers/posts.server.controller'

const router = express.Router();
const posts = postController();

router.post('/', posts.create);
router.get('/:title', posts.single);

module.exports = router;