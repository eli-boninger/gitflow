import express from 'express';
import * as controller from '../controllers/booksController.js';

const router = express.Router();

// http://localhost:8080/books/
router.route('/')
    .get(controller.getBooks)
    .post(controller.createBook);

// http://localhost:8080/books/:id
router.route('/:id')
    .get(controller.getBook)
    .put(controller.updateBook)
    .delete(controller.deleteBook);

router.get('/:id/translations', controller.getBookTranslations);

export default router;