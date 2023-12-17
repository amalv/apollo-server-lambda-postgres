import { dataSource } from "../../data-source";
import { Book } from "../../entity/Book";

export const BookResolvers = {
  Query: {
    books: async (_: any, args: { title?: string }) => {
      try {
        const dataSourceInstance = await dataSource;
        const bookRepository = dataSourceInstance.getRepository(Book);
        const books = await bookRepository.find({
          where: args.title ? { title: args.title } : {},
        });
        return books;
      } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
      }
    },
  },
};
