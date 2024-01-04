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
            queryBuilder.leftJoinAndSelect(
              Favorite,
              "favorite",
              "favorite.bookId = book.id AND favorite.userId = :userId",
              { userId }
            );
          }
        }

        books = await queryBuilder
          .orderBy("book.id", "ASC")
          .skip(skip)
          .take(take)
          .getRawMany();

        const newCursor = skip + books.length;

        return {
          cursor: newCursor,
          books: books.map((book) => {
            const isFavorited = book.favorite_id !== null;

            return {
              id: book.book_id,
              title: book.book_title,
              author: book.book_author,
              publicationDate: book.book_publicationDate,
              image: book.book_image,
              rating: book.book_rating,
              ratingsCount: book.book_ratingsCount,
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
