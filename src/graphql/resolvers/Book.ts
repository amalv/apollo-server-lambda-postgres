import { dataSource } from "../../data-source";
import { Book } from "../../entity/Book";

export const BookResolvers = {
  Query: {
    books: async (_: any, args: { title?: string }) => {
      try {
        const dataSourceInstance = await dataSource;
        const bookRepository = dataSourceInstance.getRepository(Book);
        let books;
        if (args.title) {
          books = await bookRepository
            .createQueryBuilder("book")
            .where("LOWER(book.title) LIKE :title", {
              title: `%${args.title.toLowerCase()}%`,
            })
            .getMany();
        } else {
          books = await bookRepository.find();
        }
        return books;
      } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
      }
    },
  },
};
