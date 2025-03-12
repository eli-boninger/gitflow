import express from 'express';
import booksRouter from './routes/booksRouter.js';
import authorsRouter from './routes/authorsRouter.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));