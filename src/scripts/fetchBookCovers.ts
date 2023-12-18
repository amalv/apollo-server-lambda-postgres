import https from "https";
import { writeFile } from "fs/promises";
import books from "../fixtures/raw/books.json";

const fetchBookCover = (book) =>
  new Promise((resolve, reject) => {
    https
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${book.title}+inauthor:${book.author}&fields=items(volumeInfo(imageLinks))&maxResults=1`,
        (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            const coverUrl =
              JSON.parse(data).items[0]?.volumeInfo?.imageLinks?.thumbnail;
            if (coverUrl) {
              resolve({ [book.title]: coverUrl || "No cover available" });
            }
          });
        }
      )
      .on("error", (err) => {
        reject(err);
      });
  });

const fetchBookCovers = async () => {
  const bookCovers = await Promise.all(books.map(fetchBookCover));
  const output = Object.assign({}, ...bookCovers);
  await writeFile(
    "./src/fixtures/raw/bookCovers.json",
    JSON.stringify(output, null, 2)
  );
};

fetchBookCovers();
