import { faker } from "@faker-js/faker";
import { FixtureDataSource } from "../data-source";
import { User } from "../entity/User";
import { Book } from "../entity/Book";
import { Favorite } from "../entity/Favorite";
import booksData from "../fixtures/raw/books.json";

const initializeBooks = async (bookData) => {
  if (isNaN(Date.parse(bookData.publicationDate))) {
    console.log(
      `Skipping book with invalid publication date: ${bookData.title}`
    );
    return;
  }
  const book = new Book();
  book.title = bookData.title;
  book.author = bookData.author;
  book.publicationDate = new Date(bookData.publicationDate);
  book.image = bookData.image || faker.image.url({ width: 150, height: 150 });
  book.rating = bookData.rating;
  book.ratingsCount = bookData.ratingsCount;
  return FixtureDataSource.manager.save(book);
};

const initializeUsers = async () => {
  const user = new User();
  user.auth0Id = "1234567890";
  return FixtureDataSource.manager.save(user);
};

const initializeFavorites = async (user, book) => {
  const favorite = new Favorite();
  favorite.userId = user.id;
  favorite.bookId = book.id;
  return FixtureDataSource.manager.save(favorite);
};

FixtureDataSource.initialize()
  .then(async () => {
    console.log("Dropping and recreating the tables...");
    await FixtureDataSource.manager.query('TRUNCATE "favorite" CASCADE');
    await FixtureDataSource.manager.query('TRUNCATE "user", "book" CASCADE');
    await FixtureDataSource.synchronize(true);

    console.log("Inserting new books into the database...");
    const books = await Promise.all(booksData.map(initializeBooks));

    console.log("Inserting new users into the database...");
    const user = await initializeUsers();

    console.log("Marking some books as favorites for the user...");
    await Promise.all(
      books.slice(0, 5).map((book) => initializeFavorites(user, book))
    );
  })
  .catch((error) => console.log(error));
