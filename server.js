// Set A: Library Book Management API
// This project uses Node.js and Express. Books are stored in an array.

const express = require("express");
const app = express();

const PORT = 3000;

// This lets our server read JSON data sent from Postman.
app.use(express.json());

// Starting books given in the practical question.
let books = [
    {
        id: 101,
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        genre: "Autobiography",
        publishedYear: 1999,
        available: true
    },
    {
        id: 102,
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        publishedYear: 1988,
        available: true
    },
    {
        id: 103,
        title: "Harry Potter",
        author: "J.K. Rowling",
        genre: "Fantasy",
        publishedYear: 1997,
        available: false
    }
];

// Check that all the required book details are present and have correct types.
function isValidBook(book) {
    if (!book || typeof book !== "object" || Array.isArray(book)) {
        return false;
    }

    if (
        typeof book.title !== "string" || book.title.trim() === "" ||
        typeof book.author !== "string" || book.author.trim() === "" ||
        typeof book.genre !== "string" || book.genre.trim() === "" ||
        typeof book.publishedYear !== "number" ||
        !Number.isInteger(book.publishedYear) ||
        typeof book.available !== "boolean"
    ) {
        return false;
    }

    return true;
}

// 1. GET: Show all books.
app.get("/api/books", (req, res) => {
    res.status(200).json(books);
});

// 2. POST: Add a new book.
app.post("/api/books", (req, res) => {
    const newBookDetails = req.body;

    // Check the data before adding the book.
    if (!isValidBook(newBookDetails)) {
        return res.status(400).json({
            message: "Please enter all book details correctly."
        });
    }

    // Find the next ID. The first new book will get ID 104.
    let newId = 101;

    if (books.length > 0) {
        newId = Math.max(...books.map(book => book.id)) + 1;
    }

    const newBook = {
        id: newId,
        title: newBookDetails.title.trim(),
        author: newBookDetails.author.trim(),
        genre: newBookDetails.genre.trim(),
        publishedYear: newBookDetails.publishedYear,
        available: newBookDetails.available
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully.",
        book: newBook
    });
});

// 6. GET: Find books by author.
// Keep this route above /api/books/:id so "filter" is not read as an ID.
app.get("/api/books/filter", (req, res) => {
    const authorName = req.query.author;

    if (!authorName || authorName.trim() === "") {
        return res.status(400).json({
            message: "Please enter an author name in the query."
        });
    }

    // toLowerCase() makes the search case-insensitive.
    const result = books.filter(book =>
        book.author.toLowerCase().includes(authorName.trim().toLowerCase())
    );

    // If no book matches, an empty array is returned with status 200.
    res.status(200).json(result);
});


// 3. GET: Find one book using its ID.
app.get("/api/books/:id", (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find(book => book.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: "Book not found."
        });
    }

    res.status(200).json(book);
});

// 4. PUT: Update a book using its ID.
app.put("/api/books/:id", (req, res) => {
    const bookId = Number(req.params.id);

    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found."
        });
    }

    const updatedDetails = req.body;

    // Check that the updated details are correct.
    if (!isValidBook(updatedDetails)) {
        return res.status(400).json({
            message: "Please enter all book details correctly."
        });
    }

    // Keep the old ID and replace the other details.
    books[bookIndex] = {
        id: bookId,
        title: updatedDetails.title.trim(),
        author: updatedDetails.author.trim(),
        genre: updatedDetails.genre.trim(),
        publishedYear: updatedDetails.publishedYear,
        available: updatedDetails.available
    };

    res.status(200).json({
        message: "Book updated successfully.",
        book: books[bookIndex]
    });
});

// 5. DELETE: Remove a book using its ID.
app.delete("/api/books/:id", (req, res) => {
    const bookId = Number(req.params.id);

    const book = books.find(book => book.id === bookId);

    if (!book) {
        return res.status(404).json({
            message: "Book not found."
        });
    }

    // Keep all books except the one we want to delete.
    books = books.filter(book => book.id !== bookId);

    res.status(200).json({
        message: "Book deleted successfully."
    });
});

// Show a message when the server starts.
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
