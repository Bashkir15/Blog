import express from 'express'
import postsController from '../controllers/posts.server.controller'

let router = express.Router();
let posts = postsController();

router.post('/', posts.create);

module.exports = router