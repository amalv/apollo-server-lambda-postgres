import { client, db } from "../db";
import { faker } from "@faker-js/faker";
import { book, favorite } from "../schema";
import booksData from "../fixtures/raw/books.json";

const initializeBooks = async (bookData) => {
  if (isNaN(Date.parse(bookData.publicationDate))) {
    console.log(
      `Skipping book with invalid publication date: ${bookData.title}`
    );
    return;
  }

  const bookValues = {
    title: bookData.title,
    author: bookData.author,
    publicationDate: new Date(bookData.publicationDate).toISOString(),
    image: bookData.image || faker.image.url({ width: 150, height: 150 }),
    rating: bookData.rating,
    ratingsCount: bookData.ratingsCount,
  };

  return db.insert(book).values(bookValues).returning();
};

(async () => {
  console.log("Truncating the favorite and book table...");
  await db.delete(favorite);
  await db.delete(book);

  console.log("Inserting new books into the database...");
  const books = await Promise.all(
    booksData.map((bookData) => initializeBooks(bookData))
  );
  console.log(`Inserted ${books.length} books.`);
  await client.end();
})().catch(console.error);
