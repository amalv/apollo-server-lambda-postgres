import { dataSource } from "../../data-source";
import { Book } from "../../entity/Book";

export const BookResolvers = {
  Query: {
    books: async (
      _: any,
      args: { title?: string; author?: string; cursor?: string; limit?: number }
    ) => {
      try {
        const dataSourceInstance = await dataSource;
        const bookRepository = dataSourceInstance.getRepository(Book);
        let books;
        const take = args.limit || 50;
        const skip = args.cursor ? parseInt(args.cursor) : 0;

        const queryBuilder = bookRepository.createQueryBuilder("book");

        if (args.title) {
          queryBuilder.where("LOWER(book.title) LIKE :title", {
            title: `%${args.title.toLowerCase()}%`,
          });
        }

        if (args.author) {
          queryBuilder.orWhere("LOWER(book.author) LIKE :author", {
            author: `%${args.author.toLowerCase()}%`,
          });
        }

        books = await queryBuilder
          .orderBy("book.id", "ASC")
          .skip(skip)
          .take(take)
          .getMany();

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
