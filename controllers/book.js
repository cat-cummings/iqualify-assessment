/**
 * GET /books
 * List all books
 */
const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.render('books', { books });
  } catch (err) {
    console.error('Error fetching books: ', err);
    res.status(500).send('Server Error');
  }
};

exports.createBook = async (req, res) => {
  console.log('hit the cntroler');
  try {
    const existingBook = await Book.findOne({ name: { $eq: req.body.name } });
    if (existingBook) {
      req.flash('errors', { msg: 'Book with this name already exists.' });
    }
    const book = new Book({ name: req.body.name });
    await book.save();
  } catch (err) {
    console.error('Error adding books: ', err);
    res.status(500).send('Server Error');
  }
};
