const Book = require("../models/Book")

// POST api/books
module.exports.addBook = async (req, res) => {

    // Add addedBy and dataSource
    const newBook = new Book({
        title: req.body.title,
        authors: req.body.authors,
        publisher: req.body.publisher,
        publishedOn: req.body.publishedOn,
        description: req.body.description,
        industryIdentifiers: req.body.industryIdentifiers,
        pageCount: req.body.pageCount,
        imageUrl: req.body.imageUrl,
        addedBy: req.user.id,
        googleBooksUrl: req.body.googleBooksUrl
    })

    const book = await newBook.save();
    return res.json(book);
}

// GET api/books/:bookId
module.exports.showBook = async (req, res) => {
    const book = await Book.findById(req.params.bookId)
    return res.json(book)
}

// PUT api/books/:bookId
module.exports.updateBook = async (req, res) => {
    const book = await Book.findByIdAndUpdate(
        req.params.bookId,
        {
            $set: {
                title: req.body.title,
                subtitle: req.body.subtitle,
                authors: req.body.authors,
                publisher: req.body.publisher,
                publishedOn: req.body.publishedOn,
                description: req.body.description,
                industryIdentifiers: req.body.industryIdentifiers,
                pageCount: req.body.pageCount,
                imageUrl: req.body.imageUrl,
                googleBooksUrl: req.body.googleBooksUrl
            }
        },
        { new: true });
    return res.json(book);
}

// DELETE api/books/:bookId
module.exports.deleteBook = async (req, res) => {
    await Book.findByIdAndDelete(req.params.bookId)
    return res.json({ msg: "Book deleted" })
}