import { dataSource } from "../../data-source";
import { Favorite } from "../../entity/Favorite";
import { User } from "../../entity/User";
import { Book } from "../../entity/Book";

export const FavoriteResolvers = {
  Mutation: {
    favoriteBook: async (_, { userId, bookId }, context) => {
      try {
        console.log("User ID:", userId);
        console.log("Book ID:", bookId);
        if (!userId || !bookId) {
          throw new Error("User ID or Book ID not provided");
        }
        const dataSourceInstance = await dataSource;
        const userRepository = dataSourceInstance.getRepository(User);
        const bookRepository = dataSourceInstance.getRepository(Book);
        const favoriteRepository = dataSourceInstance.getRepository(Favorite);

        const user = await userRepository.findOne({ where: { id: userId } });
        const book = await bookRepository.findOne({ where: { id: bookId } });
        if (!user || !book) {
          throw new Error("User or Book not found");
        }

        const favorite = new Favorite();
        favorite.user = user;
        favorite.book = book;

        const savedFavorite = await favoriteRepository.save(favorite);
        console.log("Saved favorite:", savedFavorite);
        return savedFavorite;
      } catch (error) {
        console.error("Error favoriting book:", error);
        throw error;
      }
    },
  },
  Query: {
    favoriteBooks: async (_, { userId }, context) => {
      try {
        const dataSourceInstance = await dataSource;
        const favoriteRepository = dataSourceInstance.getRepository(Favorite);

        const favorites = await favoriteRepository.find({
          where: { user: { id: userId } },
          relations: ["user", "book"],
        });
        console.log("Fetched favorites:", favorites);
        return favorites;
      } catch (error) {
        console.error("Error fetching favorite books:", error);
        throw error;
      }
    },
  },
};
