const express = require("express");
const morgan = require("morgan");
const books = require("./books-data");

const app = express();
app.use(morgan("common"));

app.get("/books", (req, res) => {
  const { search = "", sort } = req.query;

  if (sort) {
      if (!['title', 'rank'].includes(sort)) {
          return res
            .status(400)
            .send('Sort must be one of title or rank')
      }
  }

  let results = books.filter((book) =>
    book.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  if (sort) {
      results.sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      })
  }
  res.json(results);
});

app.listen(8000, () => {
  console.log("servers listening 8000");
});
