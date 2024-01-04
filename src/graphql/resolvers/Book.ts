import { dataSource } from "../../data-source";
import { Book } from "../../entity/Book";
import { Favorite } from "../../entity/Favorite";
import { User } from "../../entity/User";

export const BookResolvers = {
  Query: {
    books: async (
      _: any,
      args: {
        title?: string;
        author?: string;
        cursor?: string;
        limit?: number;
      },
      context: { userId?: string }
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
        let userId;

        if (context.userId) {
          const user = await dataSourceInstance.getRepository(User).findOne({
            where: { auth0Id: context.userId },
          });
          if (user) {
            userId = user.id;
          }
        }

        queryBuilder.leftJoinAndSelect("book.favorites", "favorite");

        books = await queryBuilder
          .orderBy("book.id", "ASC")
          .skip(skip)
          .take(take)
          .getMany();

        const newCursor = skip + books.length;

        return {
          cursor: newCursor,
          books: books.map((book) => {
            const isFavorited = userId
              ? book.favorites.some((favorite) => favorite.userId === userId)
              : false;

            return {
              id: book.id,
              title: book.title,
              author: book.author,
              publicationDate: book.publicationDate,
              image: book.image,
              rating: book.rating,
              ratingsCount: book.ratingsCount,
              isFavorited,
            };
          }),
        };
      } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
      }
    },
  },
};
