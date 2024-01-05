import { db } from "../db";
import { user, book, favorite } from "../schema";
import { eq, and } from "drizzle-orm";

const setup = async (userId: string, bookId: string) => {
  const userResult = await db
    .select()
    .from(user)
    .where(eq(user.auth0Id, userId))
    .execute();
  const bookResult = await db
    .select()
    .from(book)
    .where(eq(book.id, Number(bookId)))
    .execute();

  return { user: userResult[0], book: bookResult[0] };
};

export const addFavorite = async (userId: string, bookId: string) => {
  const { user: existingUser, book } = await setup(userId, bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  let userToSave = existingUser;
  if (!userToSave) {
    const userInsertResult = await db
      .insert(user)
      .values({ auth0Id: userId })
      .execute();
    userToSave = userInsertResult[0];
  }

  const favoriteInsertResult = await db
    .insert(favorite)
    .values({ userId: userToSave.id, bookId: Number(bookId) })
    .returning()
    .execute();
  return {
    id: favoriteInsertResult[0].id,
    user: userToSave,
    book: book,
  };
};

export const removeFavorite = async (userId: string, bookId: string) => {
  const { user, book } = await setup(userId, bookId);

  if (!user) {
    throw new Error("User not found");
  }

  if (!book) {
    throw new Error("Book not found");
  }

  const favoriteResult = await db
    .select()
    .from(favorite)
    .where(
      and(eq(favorite.userId, user.id), eq(favorite.bookId, Number(bookId)))
    )
    .execute();

  if (!favoriteResult[0]) {
    throw new Error("Favorite not found");
  }

  await db
    .delete(favorite)
    .where(eq(favorite.id, favoriteResult[0].id))
    .execute();
};
