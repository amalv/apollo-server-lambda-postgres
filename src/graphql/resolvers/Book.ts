import { dataSource } from "../../data-source";
import { Book } from "../../entity/Book";

export const BookResolvers = {
  Query: {
    books: async () => {
      try {
        const dataSourceInstance = await dataSource;
        const bookRepository = dataSourceInstance.getRepository(Book);
        const books = await bookRepository.find();
        return books;
      } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
      }
    },
  },
};
