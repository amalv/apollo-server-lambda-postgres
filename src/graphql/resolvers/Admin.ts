import { client, db } from "../../db";
import { book, favorite } from "../../schema";
import booksData from "../../fixtures/raw/books.json";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

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

export const loadFixtures = async () => {
  console.log("Truncating the favorite and book tables...");
  await db.delete(favorite);
  await db.delete(book);

  console.log("Inserting new books into the database...");
  const books = await Promise.all(
    booksData.map((bookData) => initializeBooks(bookData))
  );
  console.log(`Inserted ${books.length} books.`);
  await client.end();
};

function getKey(header, callback) {
  const client = jwksClient({
    jwksUri: `https://dev-udel1dobwtbe8ips.us.auth0.com/.well-known/jwks.json`,
  });
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export const AdminResolvers = {
  Mutation: {
    loadFixtures: async (_: any, args: { adminToken: string }) => {
      try {
        await new Promise((resolve, reject) => {
          jwt.verify(
            args.adminToken,
            getKey,
            { algorithms: ["RS256"] },
            function (err, decoded) {
              if (err) {
                reject(new Error("Invalid admin token"));
              } else {
                resolve(decoded);
              }
            }
          );
        });

        await loadFixtures();
        return true;
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    },
  },
};
