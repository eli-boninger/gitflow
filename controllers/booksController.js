import connection from '../db/db.js';

const getBooks = async (req, res) => {
    const sql = "select * from books";

    try {
        const [results] = await connection.query(sql);
        res.json(results);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};

const getBook = async (req, res) => {
    const sql = `select * from books where id = ?`;


    try {
        const [results] = await connection.query(sql, [req.params.id]);
        if (!!results.length) {
            res.json(results[0]);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};

const createBook = async (req, res) => {
    const sql = 'insert into books set ?';

    const { title, publish_year } = req.body;
    if (!title || !publish_year) {
        return res.status(400).send('Request body must contain data for "title" and "publish_year"');
    }

    try {
        const [results] = await connection.query(sql, [req.body]);
        res.json({ id: results.insertId });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};

const updateBook = async (req, res) => {
    const sql = 'update books set ? where id = ?';

    try {
        const [{ affectedRows }] = await connection.query(sql, [req.body, req.params.id]);
        res.json({ affectedRows });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};

const deleteBook = async (req, res) => {
    const sql = 'delete from books where id = ?';

    try {
        const [{ affectedRows }] = await connection.query(sql, [req.params.id]);
        res.status(200).send({ affectedRows });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};

const getBookTranslations = async (req, res) => {
    const sql = `
        select b.title, t.* from books b
        join translations t on t.book_id = b.id
        where b.id = ?
    `;

    // adding a comment here

    try {
        const [results] = await connection.query(sql, [req.params.id]);
        if (!results.length) {
            res.sendStatus(404);
        }
        res.json(results);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};

export {
    createBook,
    getBook,
    getBooks,
    updateBook,
    deleteBook,
    getBookTranslations
};