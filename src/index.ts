import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Book } from "./entity/Book";

AppDataSource.initialize()
  .then(async () => {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);

    console.log(
      "Here you can setup and run express / fastify / any other framework."
    );

    console.log("Inserting a new book into the database...");
    const book = new Book();
    book.title = "The Great Gatsby";
    book.author = "F. Scott Fitzgerald";
    book.publicationDate = new Date(1925, 4); // April 1925
    await AppDataSource.manager.save(book);
    console.log("Saved a new book with id: " + book.id);

    console.log("Loading books from the database...");
    const books = await AppDataSource.manager.find(Book);
    console.log("Loaded books: ", books);
  })
  .catch((error) => console.log(error));
