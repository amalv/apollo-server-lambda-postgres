import { faker } from "@faker-js/faker";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Book } from "./entity/Book";
import { booksData } from "./fixtures/books";

const initializeBooks = async (bookData) => {
  const book = new Book();
  book.title = bookData.title;
  book.author = bookData.author;
  book.publicationDate = new Date(bookData.publicationDate);
  book.image = bookData.image || faker.image.url({ width: 150, height: 150 });
  book.rating = bookData.rating;
  book.ratingsCount = bookData.ratingsCount;
  await AppDataSource.manager.save(book);
  console.log("Saved a new book with id: " + book.id);
};

const loadBooks = async () => {
  const books = await AppDataSource.manager.find(Book);
  console.log("Loaded books: ", books);
};

AppDataSource.initialize()
  .then(async () => {
    console.log("Dropping and recreating the books table...");
    await AppDataSource.synchronize(true);

    console.log("Inserting new books into the database...");
    await Promise.all(booksData.map(initializeBooks));

    console.log("Loading books from the database...");
    await loadBooks();
  })
  .catch((error) => console.log(error));
