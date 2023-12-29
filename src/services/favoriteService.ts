import { Favorite } from "../entity/Favorite";
import { User } from "../entity/User";
import { Book } from "../entity/Book";
import { dataSource } from "../data-source";

const setup = async (userId: string, bookId: string) => {
  const dataSourceInstance = await dataSource;
  const userRepository = dataSourceInstance.getRepository(User);
  const bookRepository = dataSourceInstance.getRepository(Book);
  const favoriteRepository = dataSourceInstance.getRepository(Favorite);

  const user = await userRepository.findOne({ where: { auth0Id: userId } });
  const book = await bookRepository.findOne({ where: { id: Number(bookId) } });

  return { userRepository, bookRepository, favoriteRepository, user, book };
};

export const addFavorite = async (
  userId: string,
  bookId: string
): Promise<Favorite> => {
  const { userRepository, bookRepository, favoriteRepository, user, book } =
    await setup(userId, bookId);

  if (!book) {
    throw new Error("Book not found");
  }

  let userToSave = user;
  if (!userToSave) {
    userToSave = userRepository.create({ auth0Id: userId });
    await userRepository.save(userToSave);
  }

  const favorite = new Favorite();
  favorite.user = userToSave;
  favorite.book = book;

  return favoriteRepository.save(favorite);
};

export const removeFavorite = async (
  userId: string,
  bookId: string
): Promise<boolean> => {
  const { favoriteRepository, user, book } = await setup(userId, bookId);

  if (!user) {
    throw new Error("User not found");
  }

  if (!book) {
    throw new Error("Book not found");
  }

  const favorite = await favoriteRepository.findOne({ where: { user, book } });

  if (!favorite) {
    throw new Error("Favorite not found");
  }

  await favoriteRepository.remove(favorite);
  return true;
};
