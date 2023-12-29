import { dataSource } from "../../data-source";
import { Favorite } from "../../entity/Favorite";
import { User } from "../../entity/User";
import { Book } from "../../entity/Book";

export const FavoriteResolvers = {
  Mutation: {
    favoriteBook: async (_, { bookId }, context) => {
      try {
        const userId = context.userId;

        if (!userId) {
          throw new Error("User ID not provided");
        }

        if (!bookId) {
          throw new Error("Book ID not provided");
        }

        const dataSourceInstance = await dataSource;
        const userRepository = dataSourceInstance.getRepository(User);
        const bookRepository = dataSourceInstance.getRepository(Book);
        const favoriteRepository = dataSourceInstance.getRepository(Favorite);

        let user = await userRepository.findOne({ where: { id: userId } });
        const book = await bookRepository.findOne({ where: { id: bookId } });
        if (!book) {
          throw new Error("Book not found");
        }

        if (!user) {
          user = userRepository.create({ auth0Id: userId });
          await userRepository.save(user);
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
