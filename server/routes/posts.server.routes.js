import express from 'express'
import postsController from '../controllers/posts.server.controller'

let router = express.Router();
let posts = postsController();

router.post('/', posts.create);
router.get('/:keyword/search', posts.search);

module.exports = router