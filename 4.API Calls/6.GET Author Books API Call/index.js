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

//GET Author Books API Call
app.get(
    "/authors/:authorId/books/", async (request, response) => {
      const { authorId } = request.params;
      const getAuthorBooksQuery = `select *from book where author_id=${authorId};`;
      const booksArray = await db.all(getAuthorBooksQuery);
      response.send(booksArray);
    }
);