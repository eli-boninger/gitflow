import express from 'express';
import * as controller from '../controllers/authorsController.js';

const router = express.Router();

router.route('/')
    .get(controller.getAuthors)
    .post(controller.createAuthor);

router.route('/:id')
    .get(controller.getAuthor)
    .put(controller.updateAuthor)
    .delete(controller.deleteAuthor);

export default router;