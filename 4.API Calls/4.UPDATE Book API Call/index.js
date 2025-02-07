const express = require("express");
const app = express();

const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "goodreads.db");
let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running");
    });
  } 
  catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

//UPDATE BOOK API Call
app.put("/books/:bookId/", async (request, response) => {
    const { bookId } = request.params;
    const bookDetails = request.body;
    const {
      title,
      author_id,
      rating,
      rating_count,
      review_count,
      description,
      pages,
      date_of_publication,
      edition_language,
      price,
      online_stores,
    } = bookDetails;
    const updateBookQuery = `update book set
      title = '${title}',
      author_id = ${author_id},
      rating = ${rating},
      rating_count = ${rating_count},
      review_count = ${review_count},
      description = '${description}',
      pages = ${pages},
      date_of_publication = '${date_of_publication}',
      edition_language = '${edition_language}',
      price = ${price},
      online_stores = '${online_stores}' where book_id = ${bookId};`;
    await db.run(updateBookQuery);
    response.send("Book updated successfully");
});