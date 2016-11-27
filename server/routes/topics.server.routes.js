import express from 'express';
import topicsController from '../controllers/topics.server.controller'

let router = express.Router();
let topics = topicsController();

router.post('/', topics.create);

module.exports = router