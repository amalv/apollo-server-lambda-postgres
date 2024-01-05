import { db } from "../../db";
import { book, user, favorite } from "../../schema";
import { ilike, eq, or } from "drizzle-orm";

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
        const limit = args.limit || 50;
        const offset = args.cursor ? parseInt(args.cursor) : 0;
        let query = db.select().from(book).limit(limit).offset(offset);

        let result;
        if (args.title || args.author) {
          const searchTerm = args.title || args.author;
          result = await query
            .where(
              or(
                ilike(book.title, `%${searchTerm}%`),
                ilike(book.author, `%${searchTerm}%`)
              )
            )
            .execute();
        } else {
          result = await query.execute();
        }

        let userId;
        if (context.userId) {
          const userResult = await db
            .select()
            .from(user)
            .where(eq(user.auth0Id, context.userId))
            .execute();

          if (userResult.length > 0) {
            userId = userResult[0].id;
          }
        }

        const favoritesResult = await db
          .select()
          .from(favorite)
          .where(eq(favorite.userId, userId))
          .execute();

        const favoritedBookIds = favoritesResult.map(
          (favorite) => favorite.bookId
        );

        const booksWithFavorites = result.map((book) => {
          const isFavorited = favoritedBookIds.includes(book.id);

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
        });

        const newCursor = offset + result.length;

        return {
          cursor: newCursor,
          books: booksWithFavorites,
        };
      } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
      }
    },
  },
};
