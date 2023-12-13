import books from "./raw/books.json";
import bookCovers from "./raw/bookCovers.json";

const booksData = books.map((book) => ({
  ...book,
  image: bookCovers[book.title],
}));

export default booksData;
