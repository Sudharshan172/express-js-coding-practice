## API Calls

This is a simple Express.js application for managing books in the `goodreads.db` database. It involes writing API Calls for fetching all books, fetching a single book, adding a new book, updating an existing book, deleting a book, and fetching books by a specific author from the database **goodreads.db**.

### Features

- **GET /books** - Retrieve a list of all books.
- **GET /books/:id** - Get details of a specific book by ID.
- **POST /books** - Add a new book to the database.
- **PUT /books/:id** - Update details of an existing book.
- **DELETE /books/:id** - Remove a book from the database.
- **GET /authors/:authorId/books** - Get all books by a specific author.

