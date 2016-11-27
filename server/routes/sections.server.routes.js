import express from 'express'
import sectionsController from '../controllers/sections.server.controller'

let router = express.Router();
let sections = sectionsController();

router.post('/', sections.create);

module.exports = router