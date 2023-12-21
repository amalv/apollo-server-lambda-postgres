import { dataSource } from "../../data-source";
import { Book } from "../../entity/Book";

export const BookResolvers = {
  Query: {
    books: async (
      _: any,
      args: { title?: string; cursor?: string; limit?: number }
    ) => {
      try {
        const dataSourceInstance = await dataSource;
        const bookRepository = dataSourceInstance.getRepository(Book);
        let books;
        const take = args.limit || 10; // default limit is 10
        const skip = args.cursor ? parseInt(args.cursor) : 0;

        if (args.title) {
          books = await bookRepository
            .createQueryBuilder("book")
            .where("LOWER(book.title) LIKE :title", {
              title: `%${args.title.toLowerCase()}%`,
            })
            .orderBy("book.id", "ASC")
            .skip(skip)
            .take(take)
            .getMany();
        } else {
          books = await bookRepository
            .createQueryBuilder("book")
            .orderBy("book.id", "ASC")
            .skip(skip)
            .take(take)
            .getMany();
        }

        const newCursor = skip + books.length;

        return {
          cursor: newCursor,
          books,
        };
      } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
      }
    },
  },
};
