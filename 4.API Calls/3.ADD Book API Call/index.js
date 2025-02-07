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

//ADD BOOK API Call
app.post("/books/", async (request, response) => {
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
    const addBookQuery = `insert into book(title,author_id,rating,rating_count,review_count,description,pages,date_of_publication,edition_language,price,online_stores)
    values
    ('${title}',
      ${author_id},
      ${rating},
      ${rating_count},
      ${review_count},
      '${description}',
      ${pages},
      '${date_of_publication}',
      '${edition_language}',
      ${price},
      '${online_stores}');`;
    const dbResponse = await db.run(addBookQuery);
    const bookId = dbResponse.lastID;
    response.send({ bookId: bookId });
  });