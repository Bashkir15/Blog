import express from 'express'
import postController from '../controllers/posts.server.controller'

const router = express.Router();
const posts = postController();

router.post('/', posts.create);

module.exports = router;