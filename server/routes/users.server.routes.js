import express from 'express'
import usersController from '../controllers/users.server.controller'

let router = express.Router();
let users = usersController();

router.post('/', users.create);

module.exports = router;